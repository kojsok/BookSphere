"use server";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";


export const addServicesAction = async (formData: FormData) => {
    const supabase = createClient();
 
    // Получаем данные из формы
    const businessName = formData.get("business_name") as string;
    const description = formData.get("description") as string;
    const phoneNumber = formData.get("phone_number") as string;

    // Получаем текущую сессию (владелец)
    //использовать getSession не безопасно т.к. он берет данные из куков
    // const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    // Получаем информацию о пользователе из Supabase Auth с безопасной проверкой
    // использование объекта пользователя из метода supabase.auth.getSession() может быть небезопасным,
    // поскольку данные берутся напрямую из локального хранилища (например, cookies),
    // и они могут быть изменены. Чтобы предотвратить потенциальные риски,
    // стоит использовать supabase.auth.getUser(), так как этот метод запрашивает аутентификационные
    // данные непосредственно с сервера Supabase.
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        // return { error: "Необходимо авторизоваться для добавления данных." };
        return encodedRedirect("success", "/owners/addservice", "Необходимо авторизоваться для добавления данных.");
    }

    const userEmail = user.email; // Получаем email пользователя

    // Обновляем информацию о бизнесе в таблице owners
    const { error: ownerUpdateError } = await supabase
        .from("owners")
        .update({
            business_name: businessName,
            description,
            phone_number: phoneNumber,
        })
        .eq("email", userEmail); // Обновляем запись по email пользователя

    if (ownerUpdateError) {
        console.error(`${ownerUpdateError.code} ${ownerUpdateError.message}`);
        return encodedRedirect("error", "/owners/addservice", ownerUpdateError.message);
    }

    // Возвращаем успешный результат без редиректа
    return encodedRedirect("success", "/owners/addservice", "Данные успешно добавлены или обновлены!");
    
    //!todo пример использования сессии
    // const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    // if (sessionError || !session) {
    //     // return { error: "Необходимо авторизоваться для добавления данных." };
    //     return encodedRedirect("success", "/owners/addservice", "Необходимо авторизоваться для добавления данных.");
        
    // }

    // const user = session.user;

    // if (!user) {
    //     // return { error: "Пользователь не авторизован." };
    //     return encodedRedirect("success", "/owners/addservice", "Пользователь не авторизован.");
    // }

    // // const ownerId = user.id;
    // const userEmail = user.email; // Получаем email пользователя из сессии
    // console.log("==========User email===========:", userEmail);

    // // Обновляем информацию о бизнесе в таблице owners
    // const { error: ownerUpdateError } = await supabase
    //     .from("owners")
    //     .update({
    //         business_name: businessName,
    //         description,
    //         phone_number: phoneNumber,
    //     })
    //     .eq("email", userEmail); // Обновляем запись по email пользователя

    // if (ownerUpdateError) {
    //     console.error(`${ownerUpdateError.code} ${ownerUpdateError.message}`);
    //     return encodedRedirect("error", "/owners/addservice", ownerUpdateError.message);
    // }

    // // Возвращаем успешный результат без редиректа
    // return encodedRedirect("success", "/owners/addservice", "Бизнес успешно обновлен!");
};
