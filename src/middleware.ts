import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;

  // Исключаем маршруты, которые не требуют авторизации
  if (
    urlPath.startsWith('/sign-up') ||
    urlPath.startsWith('/sign-in') ||
    urlPath.startsWith('/verify-email') ||
    urlPath.startsWith('/recover-password') ||
    urlPath.startsWith('/reset-password')
  ) {
    return NextResponse.next(); // Пропускаем middleware для этих маршрутов
  }

  // Обновляем сессию пользователя
  const session = await updateSession(request);
  console.log('Middleware is working:', request.url);
  console.log('Session:', session);

  const supabase = createClient();

  // Получаем информацию о пользователе из Supabase
  const { data: { user } } = await supabase.auth.getUser();

  // Если пользователя нет, перенаправляем на страницу входа при попытке доступа к /admin
  if (!session.ok && !user && urlPath.startsWith('/admin')) {
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Если пользователь есть, получаем его роль из таблицы users
  if (user) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id) // Используем id пользователя из Supabase
      .single();

    if (userError || !userData) {
      console.log('Error fetching user role:', userError);
      const forbiddenUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(forbiddenUrl); // Если ошибка при получении данных, перенаправляем
    }

    const userRole = userData.role;

    // Проверяем роль для маршрута /owners/
    if (urlPath.startsWith('/owners') && userRole !== 'owner') {
      const forbiddenUrl = new URL('/infoerrorpage', request.url); // Редирект на страницу 403 или другой URL
      return NextResponse.redirect(forbiddenUrl);
    }

    // Проверяем роль для маршрута /clients/
    if (urlPath.startsWith('/clients') && userRole !== 'client') {
      const forbiddenUrl = new URL('/infoerrorpage', request.url); // Редирект на страницу 403 или другой URL
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/owners/:path*',
    '/clients/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};


//!работает не удалять
// import { type NextRequest, NextResponse } from 'next/server';
// import { updateSession } from '@/utils/supabase/middleware';
// import { createClient } from '@/utils/supabase/server';

// export async function middleware(request: NextRequest) {
//   const urlPath = request.nextUrl.pathname;

//   // Исключаем маршруты, которые не требуют авторизации
//   if (
//     urlPath.startsWith('/sign-up') ||
//     urlPath.startsWith('/sign-in') ||
//     urlPath.startsWith('/verify-email') ||
//     urlPath.startsWith('/recover-password') ||
//     urlPath.startsWith('/reset-password')
//   ) {
//     return NextResponse.next(); // Пропускаем middleware для этих маршрутов
//   }

//   // Обновляем сессию пользователя
//   const session = await updateSession(request);
//   console.log('Middleware is working:', request.url);
//   console.log('Session:', session);

//   const supabase = createClient();

//   // Получаем информацию о пользователе
//   const { data: { user } } = await supabase.auth.getUser();
//   console.log('User:', user);

//   // Если пользователь найден, но email не подтвержден
//   // if (user && !user.email_confirmed_at) {
//   //   console.log('Email not confirmed for user:', user.email);
//   //   const verifyEmailUrl = new URL('/verify-email', request.url);
//   //   return NextResponse.redirect(verifyEmailUrl);
//   // }

//   // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
//   if (!session.ok && !user && urlPath.startsWith('/admin')) {
//     const loginUrl = new URL('/sign-in', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };





//!работает но не ждем авторизацию по емайл
// import { type NextRequest, NextResponse } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'
// import { createClient } from '@/utils/supabase/server'

// export async function middleware(request: NextRequest) {
//   const urlPath = request.nextUrl.pathname;
  
//   // Исключаем маршруты, которые не требуют авторизации (например, /sign-up, /sign-in)
//   if (urlPath.startsWith('/sign-up') || urlPath.startsWith('/sign-in')) {
//     return NextResponse.next(); // Пропускаем middleware для этих маршрутов
//   }

//   // Обновляем сессию пользователя
//   const session = await updateSession(request)
//   console.log('Middleware is working:', request.url)
//   console.log('Session:', session);

//   const supabase = createClient();
  
//   // Получаем информацию о пользователе
//   const { data: { user } } = await supabase.auth.getUser();
//   console.log('User:', user);

//   // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
//   if (!session.ok && urlPath.startsWith('/admin')) {
//     // Если пользователь не авторизован, перенаправляем на страницу входа
//     const loginUrl = new URL('/sign-in', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Если пользователь авторизован или маршрут не требует авторизации, продолжаем
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)', 
//   ],
// };


// import { type NextRequest, NextResponse } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'
// import { createClient } from '@/utils/supabase/server';
// // import { createClient } from './utils/supabase/server';

// export async function middleware(request: NextRequest) {
//   // Обновляем сессию пользователя
//   // const supabase = createClient()
//   // const { data: session } = await supabase.auth.getSession()
  
//   const session = await updateSession(request)
//   console.log('Middleware is working:', request.url)
//   console.log('Session:', session);

//   const supabase = createClient()
//   // Получаем информацию о пользователе из supabaseResponse
//   const {data: { user },} = await supabase.auth.getUser() // Измените это, если метод получения пользователя другой
//     console.log('User:', user);

//   // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
//   if (!session.ok && request.nextUrl.pathname.startsWith('/admin')) {
//     // Если пользователь не авторизован, перенаправляем на страницу входа
//     const loginUrl = new URL('/sign-in', request.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   // Если авторизован или маршрут не требует авторизации, продолжаем
//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     /*
//      * Проверка всех маршрутов, которые начинаются с /admin
//      */
//     '/admin/:path*', // это добавляет поддержку всех маршрутов после /admin/
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }