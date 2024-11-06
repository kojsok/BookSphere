"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import {
  MutationService,
  QueryService,
  servicesFormSchema,
} from "../types/services";
import { PostgrestError, User } from "@supabase/supabase-js";
import { getRowsRange } from "@/lib/getRowsRange";

type ExtendedUser = User & { user_role: "owner" | "client" | "admin" };

//получаем данные о пльзователе с серверного клиента
const getUser = async (): Promise<ExtendedUser> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Пользователь не авторизован");
  }
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();
  return { ...user, user_role: userRole?.role };
};

/**
 * Adds or updates a service in the database.
 *
 * This function is responsible for either inserting a new service or updating an existing one based on the provided `formData`.
 * It also validates the data using the `servicesFormSchema` and performs transformations where necessary, such as calculating
 * the duration of the service in seconds.
 *
 * @param {FormData} formData - The form data containing the service details. The form should include fields for:
 *     - `service_id`: The ID of the service to update (optional, if not provided, a new service is created).
 *     - `price`: The price of the service.
 *     - `description`: A brief description of the service.
 *     - `name`: The name of the service.
 *     - `hours`: The duration in hours.
 *     - `minutes`: The duration in minutes.
 *
 * @returns {Promise<{ error?: Error, errors?: Record<string, string[]> }>} -
 *     An object containing:
 *     - `error` (Error): An error object if the operation fails (either insertion or update).
 *     - `errors` (Record<string, string[]>): A record of field validation errors if validation fails.
 *
 * @throws {Error} - Throws an error if the operation fails (e.g., if the insert or update fails).
 */
export const addOrUpdateService = async (formData: FormData) => {
  const supabase = createClient();
  try {
    const user: ExtendedUser = await getUser();

    //преобразуем форм дату в нужны объект и проверяем по схеме
    const service_id = formData.get("service_id");
    console.log(service_id);

    const objFromFormData = {
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      name: formData.get("name") as string,
      hours: Number(formData.get("hours")),
      minutes: Number(formData.get("minutes")),
    };
    //валидация данных с помощью зод
    const validateServicesData = servicesFormSchema.safeParse(objFromFormData);
    if (!validateServicesData.success) {
      console.log(validateServicesData.error.flatten().fieldErrors);
      return { errors: validateServicesData.error.flatten().fieldErrors };
    }
    // формируем объект для отправки в бд
    const { hours, minutes, ...rest } = objFromFormData;
    const service: MutationService = {
      duration: (hours * 60 + minutes) * 60,
      owner_id: user.id,
      ...rest,
    };
    let error: PostgrestError | null;
    if (service_id) {
      ({ error } = await supabase
        .from("services")
        .update(service)
        .eq("id", service_id));
    } else {
      ({ error } = await supabase.from("services").insert(service));
    }
    if (error)
      throw new Error(`Не удалось добавить/обновить услугу: ${error.message}`);
  } catch (error) {
    return { error };
  }
  revalidatePath("/owners/services");
};

interface OwnerServicesFilterOptions {
  page?: number | null;
  pageOffset?: number;
  filters?: SeriviceFilter[];
}

interface SeriviceFilter {
  column: string;
  value: unknown;
  operator: "eq" | "gt" | "lt" | "gte" | "lte";
}

/**
 * Retrieves all services of a user with optional filtering and pagination.
 *
 * This function queries the "services" table to retrieve services for a specific user, applying any
 * filters and pagination options passed in the `options` parameter.
 *
 * @param {OwnerServicesFilterOptions} [options] - Optional filter and pagination options:
 *     - `page` (number): The page number to retrieve (for pagination).
 *     - `pageOffset` (number): The number of records per page.
 *     - `filters` (SeriviceFilter[]): The filters to apply to the query.
 *
 * @returns {Promise<{ count: number | null, data: QueryService[] | null, error: string | null }>}

 */

export const readAllUserServices = async (
  options: OwnerServicesFilterOptions = {}
): Promise<{
  count: number | null;
  data: QueryService[] | null;
  error: string | null;
}> => {
  const { page = null, pageOffset, filters = [] } = options;

  //инициируем запрос к базе
  const supabase = createClient();
  const { id } = await getUser();
  //если опции отсутствуют получаем все записи из таблицы
  let query = supabase
    .from("services")
    .select("*", { count: "exact" })
    .eq("owner_id", id);

  //добавляем еще фильтры если есть
  filters.forEach(({ column, value, operator }: SeriviceFilter) => {
    if (query[operator]) {
      query = query[operator](column, value);
    } else {
      console.warn(`Incorrect filter operator: ${operator}`);
    }
  });
  // упорядочиваем
  query = query.order("created_at", { ascending: true });

  //если есть номер страницы и смещение используем их
  if (typeof page === "number" && !isNaN(page) && pageOffset) {
    //получаем диапазон (сколько записей в одной странице)
    const { from, to } = getRowsRange(pageOffset, page);
    query = query.range(from, to);
  }

  const { count, data, error } = await query;

  return {
    count,
    data,
    error: error
      ? "Не удалось получить услуги пользователя. Попробуйте позже."
      : null,
  };
};

/**
 * Retrieves a service by its ID from the database.
 *
 * @param {string} id - The ID of the service to fetch.
 *
 * @returns {Promise<{ error?: string, service?: QueryService }>}
 *
 * @throws {Error} - Throws an error if there are issues with the query, which will be logged.
 */
export const getServiceById = async (
  id: string
): Promise<{ error?: string; service?: QueryService }> => {
  const supabase = createClient();
  try {
    const { data: service, error } = await supabase
      .from("services")
      .select()
      .eq("id", id)
      .single();
    if (error) throw error;
    return service;
  } catch (error) {
    console.error("Ошибка при получении услуги по ID:", error);
    return { error: "Не удалось получить услугу. Попробуйте позже." };
  }
};

/**
 * Deletes a service by its ID from the database.
 *
 * This function deletes a service from the "services" table using the provided `id`. After deleting, it revalidates the path to
 * ensure the latest data is reflected. The response from Supabase is logged for debugging purposes.
 *
 * @param {string} id - The ID of the service to delete.
 *
 * @returns {Promise<void>} - A promise that resolves when the service is successfully deleted and the path is revalidated.
 *
 * @example
 * await deleteService("service-id");
 * // After deletion, the path "/owners/services" is revalidated.
 */

export const deleteService = async (id: string): Promise<void> => {
  const supabase = createClient();
  const response = await supabase.from("services").delete().eq("id", id);
  console.log(response);
  revalidatePath("/owners/services");
};
