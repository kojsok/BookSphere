
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  // Инициализация клиента Supabase
  const supabase = createClient();

  // Получение текущего пользователя
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Проверка, залогирован ли пользователь
  if (!user) {
    // Если пользователь не залогирован, перенаправляем на страницу входа
    return redirect("/sign-in");
  }

  // Получение информации о пользователе из таблицы users
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  // Проверка на ошибки при запросе к таблице
  if (userError || !userData) {
    console.error("Ошибка при получении роли пользователя:", userError?.message);
    return redirect("/sign-in");
  }

  // Проверка роли пользователя
  if (userData.role === "owner") {
    // Если роль пользователя owner, перенаправляем на страницу владельцев
    return redirect("/owners");
  } else if (!userData.role) {
    // Если у пользователя нет роли, перенаправляем на защищённую страницу
    return redirect("/protected");
  }

  // Если пользователь залогирован и его роль не owner, показываем страницу клиента
  return (
    <div>
      <h1>Страница для клиентов {user.email}</h1>
      <p>Добро пожаловать, Клиент {userData.role}!</p>
    </div>
  );
}