"use server";

import { encodedRedirect, validateEmail } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Действие для регистрации пользователя
// export const signUpAction = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const passwordConfirmation = formData.get("password_confirmation") as string;
//   const supabase = createClient();
//   const origin = headers().get("origin");

//   // Проверка на наличие обязательных полей
//   if (!email || !password || !passwordConfirmation) {
//     return encodedRedirect("error", "/sign-up", "Email and password are required");
//   }

//   // Валидация email
//   if (!validateEmail(email)) {
//     return encodedRedirect("error", "/sign-up", "Email is not valid");
//   }

//   // Проверка совпадения пароля и его подтверждения
//   if (password !== passwordConfirmation) {
//     return encodedRedirect("error", "/sign-up", "Incorrect password confirmation");
//   }

//   // Регистрация пользователя через Supabase
//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`, // Перенаправление после подтверждения
//     },
//   });

//   // Обработка ошибок при регистрации
//   if (error) {
//     console.error(`${error.code} ${error.message}`);
//     return encodedRedirect("error", "/sign-up", error.message);
//   } 

//   // Успешная регистрация, отправка уведомления
//   return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
// };

//Действие для регистрации пользователя и добавление в базу данных
// export const signUpAction = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const passwordConfirmation = formData.get("password_confirmation") as string;
//   const name = formData.get("name") as string; // Получаем имя из формы
//   const role = formData.get("role") as string; // Получаем роль из формы
//   const supabase = createClient();
//   const origin = headers().get("origin");

//   // Проверка на наличие обязательных полей
//   if (!email || !password || !passwordConfirmation || !name || !role) {
//     return encodedRedirect("error", "/sign-up", "All fields are required");
//   }

//   // Валидация email
//   if (!validateEmail(email)) {
//     return encodedRedirect("error", "/sign-up", "Email is not valid");
//   }

//   // Проверка совпадения пароля и его подтверждения
//   if (password !== passwordConfirmation) {
//     return encodedRedirect("error", "/sign-up", "Incorrect password confirmation");
//   }

//   // Регистрация пользователя через Supabase Auth
//   const { data: authData, error: authError } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`, // Перенаправление после подтверждения
//     },
//   });

//   // Обработка ошибок при регистрации
//   if (authError) {
//     console.error(`${authError.code} ${authError.message}`);
//     return encodedRedirect("error", "/sign-up", authError.message);
//   }

//   // Если регистрация успешна, добавляем пользователя в таблицу `users`
//   const { error: insertError } = await supabase
//     .from("users")
//     .insert({
//       id: authData.user?.id, // UUID пользователя из Supabase Auth
//       email,
//       name,
//       role,
//       created_at: new Date().toISOString(), // Дата создания
//     });

//   // Обработка ошибок при добавлении в таблицу `users`
//   if (insertError) {
//     console.error(`${insertError.code} ${insertError.message}`);
//     return encodedRedirect("error", "/sign-up", insertError.message);
//   }

//   // Успешная регистрация, отправка уведомления
//   return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
// };

//TODO разбираюсь и правлю
export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("password_confirmation") as string;
  const name = formData.get("name") as string; // Получаем имя из формы
  const role = formData.get("role") as string; // Получаем роль из формы
  const supabase = createClient();
  const origin = headers().get("origin");

  // Проверка на наличие обязательных полей
  if (!email || !password || !passwordConfirmation || !name || !role) {
    return encodedRedirect("error", "/sign-up", "All fields are required");
  }

  // Валидация email
  if (!validateEmail(email)) {
    return encodedRedirect("error", "/sign-up", "Email is not valid");
  }

  // Проверка совпадения пароля и его подтверждения
  if (password !== passwordConfirmation) {
    return encodedRedirect("error", "/sign-up", "Incorrect password confirmation");
  }

  // Проверка существующего пользователя
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      // Пользователь не найден, можно регистрировать
      console.log('Пользователь не найден, можно регистрировать.');
    } else {
      console.error(`Fetch error: ${fetchError.message}`);
      return encodedRedirect("error", "/sign-up", fetchError.message);
    }
  } else {
    // Пользователь найден
    return encodedRedirect("error", "/sign-up", "User already exists with this email.");
  }
  
  // Регистрация пользователя через Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`, // Перенаправление после подтверждения
    },
  });

  // Обработка ошибок при регистрации
  if (authError) {
    console.error(`${authError.code} ${authError.message}`);
    return encodedRedirect("error", "/sign-up", authError.message);
  }

  // Если регистрация успешна, добавляем пользователя в таблицу `users`, включая пароль
  const { error: insertError } = await supabase
    .from("users")
    .insert({
      id: authData.user?.id, // UUID пользователя из Supabase Auth
      email,
      name,
      role,
      password, // Сохраняем пароль (учтите безопасность хранения)
      created_at: new Date().toISOString(), // Дата создания
    });

  // Обработка ошибок при добавлении в таблицу `users`
  if (insertError) {
    console.error(`${insertError.code} ${insertError.message}`);
    return encodedRedirect("error", "/sign-up", insertError.message);
  }

  // Если роль "owner", добавляем данные в таблицу `owners`
  if (role === 'owner') {
    const { error: ownerInsertError } = await supabase
      .from("owners")
      .insert({
        id: authData.user?.id, // UUID пользователя из Supabase Auth
        email,
        name,
        created_at: new Date().toISOString(),
      });

    // Обработка ошибок при добавлении в таблицу `owners`
    if (ownerInsertError) {
      console.error(`${ownerInsertError.code} ${ownerInsertError.message}`);
      return encodedRedirect("error", "/sign-up", ownerInsertError.message);
    }
  }

  // Успешная регистрация, отправка уведомления
  return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
};

//!!пробный
// export const signUpAction = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const passwordConfirmation = formData.get("password_confirmation") as string;
//   const name = formData.get("name") as string; // Получаем имя из формы
//   const role = formData.get("role") as string; // Получаем роль из формы
//   const supabase = createClient();
//   const origin = headers().get("origin");

//   // Проверка на наличие обязательных полей
//   if (!email || !password || !passwordConfirmation || !name || !role) {
//     return encodedRedirect("error", "/sign-up", "All fields are required");
//   }

//   // Валидация email
//   if (!validateEmail(email)) {
//     return encodedRedirect("error", "/sign-up", "Email is not valid");
//   }

//   // Проверка совпадения пароля и его подтверждения
//   if (password !== passwordConfirmation) {
//     return encodedRedirect("error", "/sign-up", "Incorrect password confirmation");
//   }

//   // Регистрация пользователя через Supabase Auth
//   const { data: authData, error: authError } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`, // Перенаправление после подтверждения
//     },
//   });

//   // Обработка ошибок при регистрации
//   if (authError) {
//     console.error(`${authError.code} ${authError.message}`);
//     return encodedRedirect("error", "/sign-up", authError.message);
//   }

//   // Если регистрация успешна, добавляем пользователя в таблицу `users`, включая пароль
//   const { error: insertError } = await supabase
//     .from("users")
//     .insert({
//       id: authData.user?.id, // UUID пользователя из Supabase Auth
//       email,
//       name,
//       role,
//       password, // Сохраняем пароль (учтите безопасность хранения)
//       created_at: new Date().toISOString(), // Дата создания
//     });

//   // Обработка ошибок при добавлении в таблицу `users`
//   if (insertError) {
//     console.error(`${insertError.code} ${insertError.message}`);
//     return encodedRedirect("error", "/sign-up", insertError.message);
//   }

//   // Если роль "owner", добавляем данные в таблицу `owners`
//   if (role === 'owner') {
//     const { error: ownerInsertError } = await supabase
//       .from("owners")
//       .insert({
//         id: authData.user?.id, // UUID пользователя из Supabase Auth
//         email,
//         name,
//         created_at: new Date().toISOString(),
//       });

//     // Обработка ошибок при добавлении в таблицу `owners`
//     if (ownerInsertError) {
//       console.error(`${ownerInsertError.code} ${ownerInsertError.message}`);
//       return encodedRedirect("error", "/sign-up", ownerInsertError.message);
//     }
//   }

//   // Успешная регистрация, отправка уведомления
//   return encodedRedirect("success", "/sign-up", "Thanks for signing up! Please check your email for a verification link.");
// };


//!пробный вариант
export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  // Проверка на наличие email и пароля
  if (!email || !password) {
    return encodedRedirect("error", "/sign-in", "Email and password are required");
  }

  // Вход пользователя через Supabase
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Обработка ошибок при входе
  if (authError) {
    return encodedRedirect("error", "/sign-in", authError.message);
  }

  // Проверка наличия пользователя после успешного входа
  if (!authData.user) {
    return encodedRedirect("error", "/sign-in", "User not found.");
  }

  // Логирование для отладки
  // console.log("Auth data:", authData.user);

  // Получение информации о пользователе из таблицы `users`
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", authData.user.id)
    .single();

  // Логирование данных
  // console.log("User data:", user);
  // console.log("User error:", userError);

  // Обработка ошибок при запросе данных пользователя
  if (userError || !user) {
    return encodedRedirect("error", "/sign-in", "Failed to retrieve user role.");
  }

  // Перенаправление в зависимости от роли пользователя
  if (user.role === "owner") {
    return redirect("/owners");
  }

  if (user.role === "client") {
    return redirect("/clients");
  }

  //!TODO Если роль пользователя не распознана, перенаправляем в защищенную зону
  return redirect("/protected");
};

// Действие для запроса одноразового пароля (OTP) на email
export const requestOTPAction = async (formData: FormData) => {
  // Извлечение email из данных формы
  const email = formData.get("email") as string;
  // Создание клиента Supabase для взаимодействия с сервисами Supabase
  const supabase = createClient();

  // Проверка на наличие email
  if (!email) {
    return encodedRedirect("error", "/recover-password", "Email is required");
  }

  // Валидация email
  if (!validateEmail(email)) {
    return encodedRedirect("error", "/recover-password", "Email is not valid");
  }

  // Отправка одноразового пароля (OTP) на email
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // Убеждаемся, что пользователь не будет создан
    },
  });

  // Обработка ошибок при отправке OTP
  if (error) {
    console.error(`${error.code} ${error.message}`);
    return encodedRedirect("error", "/recover-password", error.message);
  }

  // Успешная отправка OTP, уведомление пользователя
  return encodedRedirect("success", "/reset-password", "One time password has been sent to email, please check", { email });
};

// Действие для восстановления пароля
//TODO доделать обновление пароля в таблице users
export const recoverPassAction = async (formData: FormData) => {
  // Извлечение code, email, newPassword, passwordConfirmation и кода из данных формы
  const code = formData.get("code") as string;
  const email = formData.get("email") as string;
  const newPassword = formData.get("new_password") as string;
  const passwordConfirmation = formData.get("password_confirmation") as string;
  const supabase = createClient();

  // Проверка на наличие обязательных полей
  if (!email || !code || !newPassword || !passwordConfirmation) {
    return encodedRedirect("error", "/reset-password", "Email, password and code are required");
  }

  // Проверка совпадения пароля и его подтверждения
  if (newPassword !== passwordConfirmation) {
    return encodedRedirect("error", "/reset-password", "Incorrect password confirmation");
  }

  // Проверка длины нового пароля
  if (newPassword.length < 6) {
    return encodedRedirect("error", "/reset-password", "New password should be of 6 minimum characters");
  }

  // Верификация OTP (одноразового пароля) через Supabase
  const { data: { session }, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email", // Тип верификации по email
  });

  // Проверка на успешную верификацию
  if (!session?.user?.email === email || !session?.user?.aud === "authenticated") {
    return encodedRedirect("error", "/sign-in", "Could not verify OTP");
  }
  // if (session?.user?.email !== email || session?.user?.aud !== "authenticated") {
  //   return encodedRedirect("error", "/sign-in", "Could not verify OTP");
  // }

  // Обработка ошибок при верификации OTP
  if (error) {
    return encodedRedirect("error", "/reset-password", error.message);
  }

  // Обновление пароля пользователя
  const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });

  // Проверка на успешное обновление пароля
  // if (passwordError) {
  //   return encodedRedirect("error", "/reset-password", passwordError.message);
  // }

  // Обработка ошибок при обновлении пароля
  if (passwordError) {
    return encodedRedirect("error", "/reset-password", passwordError.message);
  }

  //TODO Успешное восстановление пароля, перенаправление доделать
  return redirect("/protected");
};

// Действие для выхода пользователя
export const signOutAction = async () => {
  const supabase = createClient();

  // Выход из аккаунта через Supabase
  await supabase.auth.signOut();

  // Перенаправление на страницу входа
  return redirect("/");
};
