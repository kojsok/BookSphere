"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { IService, servicesFormSchema } from "../types/services";

export const addService = async (formData: FormData) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("Пользователь не авторизован");
    return { error: "Пользователь не авторизован" };
  }

  //преобразуем форм дату в нужны объект и проверяем по схеме
  const objFromFormData = {
    price: Number(formData.get("price")),
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
  const service: IService = {
    duration: (hours * 60 + minutes) * 60,
    owner_id: user.id,
    ...rest,
  };
  console.log(service);
  const { error } = await supabase.from("services").insert(service);
  if (error) {
    console.log(error);
  } else {
    revalidatePath("/owners/services");
  }
};
