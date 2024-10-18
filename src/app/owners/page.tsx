import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function OwnersPage() {
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

  // // Проверка роли пользователя
  // if (userData.role !== "owner") {
  //   // Если роль пользователя не owner, перенаправляем на защищённую страницу
  //   return redirect("/protected");
  // }

  // Проверка роли пользователя
  if (userData.role === "client") {
    // Если роль пользователя client, перенаправляем на страницу клиентов
    return redirect("/clients");
  } else if (!userData.role) {
    // Если у пользователя нет роли, перенаправляем на защищённую страницу
    return redirect("/protected");
  }

  // Если роль owner, отображаем страницу владельцев
  return (
    <div>
      <h1>Страница для владельцев {user.email}</h1>
      <p>Добро пожаловать, владелец {userData.role}!</p>
    </div>
  );
}


// export default async function OwnersPage() {
//   return (
//         <div>
//           <h1>Страница для владельцев</h1>
//           <p>Добро пожаловать, владелец!</p>
//         </div>
//       );
//     }

// import { redirect } from "next/navigation";
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"; // Убедитесь, что пакет установлен
// import { headers } from 'next/headers';

// export default async function OwnersPage() {
//   // Создаем клиент Supabase с серверной стороны
//   const supabase = createServerSupabaseClient({ req: { headers } });
//   const { data: { session } } = await supabase.auth.getSession();

//   // Если сессии нет, редиректим на страницу входа
//   if (!session) {
//     redirect("/sign-in");
//     return null; // Возвращаем null, чтобы не рендерить ничего дальше
//   }

//   // Получаем данные о пользователе из таблицы users
//   const { data: user, error: userError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", session.user.id)
//     .single();

//   // Обрабатываем ошибку запроса
//   if (userError || !user) {
//     console.error("Ошибка при получении данных пользователя:", userError?.message);
//     redirect("/sign-in"); // Редиректим на страницу входа при ошибке
//     return null;
//   }

//   // Проверяем роль пользователя
//   if (user.role !== "owner") {
//     redirect("/clients"); // Редиректим на другую страницу, если роль не owner
//     return null;
//   }

//   // Если пользователь залогирован и его роль owner, отображаем страницу
//   return (
//     <div>
//       <h1>Страница для владельцев</h1>
//       <p>Добро пожаловать, владелец!</p>
//     </div>
//   );
// }




// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { headers } from 'next/headers';

// export default async function OwnersPage() {
//   const supabase = createServerSupabaseClient({ headers });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return <div>Пожалуйста, войдите в систему</div>;
//   }

//   return (
//     <div>
//       <h1>Страница для владельцев</h1>
//       <p>Добро пожаловать, владелец!</p>
//     </div>
//   );
// }