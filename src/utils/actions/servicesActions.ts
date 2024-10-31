"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import {
  MutationService,
  QueryService,
  servicesFormSchema,
} from "../types/services";
import { PostgrestError, User } from "@supabase/supabase-js";

type ExtendedUser = User & { user_role: "owner" | "client" | "admin" };

const getUser = async (): Promise<ExtendedUser> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("Пользователь не авторизован");
    // return { error: "Пользователь не авторизован" };
    throw new Error("Пользователь не авторизован");
  }
  const { data: userRole } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();
  return { ...user, user_role: userRole?.role };
};

export const addOrUpdateService = async (formData: FormData) => {
  const supabase = createClient();
  try {
    const user: ExtendedUser = await getUser();
    //преобразуем форм дату в нужны объект и проверяем по схеме
    const service_id = formData.get("service_id");

    const objFromFormData = {
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      name: formData.get("name") as string,
      hours: Number(formData.get("hours")),
      minutes: Number(formData.get("minutes")),
    };
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
      throw new Error(
        "Ошибка при добавлении/обновлении услуги: " + error.message
      );
    revalidatePath("/owners/services");
  } catch (error) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    };
  }
};

export const readAllUserServices = async (): Promise<{
  data: QueryService[] | null;
  error: string | null;
}> => {
  const supabase = createClient();
  const { id } = await getUser();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("owner_id", id);
  return {
    data,
    error: error
      ? "Не удалось получить услуги пользователя. Попробуйте позже."
      : null,
  };
};

export const getServiceById = async (id: string) => {
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
