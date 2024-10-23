"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';

export const getServicesAction = async () => {
    const supabase = createClient(); 
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "Необходимо авторизоваться для добавления данных." };  
    }
    const userEmail = user.email; // Получаем email пользователя

    // Запрос данных из таблицы "owners"
    const { data: ownersData, error: ownersError } = await supabase
        .from('owners')
        .select('id, business_name, description, phone_number, name, email, services, working_hours')
        .eq('email', userEmail); // Предполагается, что email используется для связи владельца

    if (ownersError) {
        return { error: "Ошибка при получении данных о владельце." };
    }
    revalidatePath('/owners');
    // Возвращаем данные
    return ownersData;
    
}


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
        return { error: "Необходимо авторизоваться для добавления данных." };  
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
        // return encodedRedirect("error", "/owners/addservice", ownerUpdateError.message);
        return { error: "Необходимо авторизоваться для добавления данных." + ownerUpdateError.message };  
    }

    revalidatePath('/owners');

    // Возвращаем успешный результат без редиректа
    //return encodedRedirect("success", "/owners/addservice", "Данные успешно добавлены или обновлены!");
    return {success: "Данные успешно добавлены или обновлены!"};
    
};