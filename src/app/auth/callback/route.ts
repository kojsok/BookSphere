import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}


// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;
//   const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
//   const supabase = createClient();

//   if (code) {
//     // Обмен кода авторизации на сессию пользователя
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (error) {
//       return NextResponse.redirect(`${origin}/sign-up?error=${error.message}`);
//     }
//   }

//   // Получаем информацию о текущей сессии
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (sessionError || !session) {
//     return NextResponse.redirect(`${origin}/sign-in`);
//   }

//   // Получаем информацию о пользователе из таблицы `users`
//   const { data: user, error: userError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", session.user.id)
//     .single();

//   if (userError || !user) {
//     return NextResponse.redirect(`${origin}/sign-in`);
//   }

//   // Перенаправляем в зависимости от роли пользователя
//   if (user.role === "owner") {
//     return NextResponse.redirect(`${origin}/owner`);
//   }

//   if (user.role === "client") {
//     return NextResponse.redirect(`${origin}/clients`);
//   }

//   // Если роль не распознана, перенаправляем на защищенную страницу
//   return NextResponse.redirect(`${origin}/protected`);
// }

