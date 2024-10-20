import { redirect } from "next/navigation";
import OwnerPageContent from "./OwnerPageContent";
import { createClient } from "@/utils/supabase/server";

export default async function OwnersPage() {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    // Логируем данные пользователя
    // console.log("User data:", user);
    // console.log("User error:", userError);

    // Если пользователя нет, перенаправляем на страницу входа
    if (userError || !user) {
        console.log("Redirecting to sign-in due to missing user");
        redirect("/sign-in");
        return; // Это нужно для того, чтобы TypeScript не выдавал ошибку
    }

    const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

    // Если произошла ошибка при получении роли или данных о пользователе
    if (roleError || !userData) {
        console.error("Ошибка при получении роли пользователя:", roleError?.message);
        redirect("/sign-in");
        return; // Это нужно для того, чтобы TypeScript не выдавал ошибку
    }

    // Проверяем роль пользователя
    console.log("User role:", userData.role); // Логируем роль пользователя
    if (userData.role !== "owner") {
        console.log("Redirecting to protected due to insufficient role");
        redirect("/protected"); // Можно перенаправить на другую страницу, если роль не "owner"
        return; // Это нужно для того, чтобы TypeScript не выдавал ошибку
    }

    // Если всё в порядке, возвращаем компонент
    // console.log("Rendering OwnerPageContent");
    return <OwnerPageContent user={user} role={userData.role} />;
}