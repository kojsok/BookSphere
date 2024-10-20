import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;
  
  // Исключаем маршруты, которые не требуют авторизации (например, /sign-up, /sign-in)
  if (urlPath.startsWith('/sign-up') || urlPath.startsWith('/sign-in')) {
    return NextResponse.next(); // Пропускаем middleware для этих маршрутов
  }

  // Обновляем сессию пользователя
  const session = await updateSession(request)
  console.log('Middleware is working:', request.url)
  console.log('Session:', session);

  const supabase = createClient();
  
  // Получаем информацию о пользователе
  const { data: { user } } = await supabase.auth.getUser();
  console.log('User:', user);

  // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
  if (!session.ok && urlPath.startsWith('/admin')) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Если пользователь авторизован или маршрут не требует авторизации, продолжаем
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)', 
  ],
};




// //работает но ломает авторизацию
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

//!исходник
// import { type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }




//!проверить 
// import { type NextRequest, NextResponse } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'
// // import { createClient } from '@/utils/supabase/server'




// export async function middleware(request: NextRequest) {
//   // Обновляем сессию пользователя
//   // const supabase = createClient()
//   // const { data: session } = await supabase.auth.getSession()
  
//   const session = await updateSession(request)
//   console.log('Middleware triggered:', request.url)
//   console.log('Session:', session);

//   // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
//   if (!session && request.nextUrl.pathname.startsWith('/admin')) {
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

//!исходник
// import { type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }


//!TODO пример но не проверил
// import { NextResponse } from 'next/server';
// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
  
//   const supabase = createMiddlewareSupabaseClient({ req, res });
  
//   // Проверяем аутентификацию пользователя через Supabase
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
  
//   if (!session) {
//     // Если пользователь не авторизован, перенаправляем его на страницу входа
//     return NextResponse.redirect(new URL('/sign-in', req.url));
//   }

//   // Получаем данные о пользователе из таблицы `users`
//   const { data: user, error } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', session.user.id)
//     .single();

//   if (error || !user) {
//     return NextResponse.redirect(new URL('/error', req.url));
//   }

//   // Если пользователь владелец (owner) и пытается зайти на не владельческую страницу
//   if (user.role === 'owner' && !req.url.includes('/owners')) {
//     return NextResponse.redirect(new URL('/owners', req.url));
//   }

//   // Если пользователь клиент и пытается зайти на владельческую страницу
//   if (user.role === 'client' && req.url.includes('/owners')) {
//     return NextResponse.redirect(new URL('/clients', req.url));
//   }

//   return res;
// }

// // Фильтр срабатывания middleware только для определённых маршрутов
// export const config = {
//   matcher: ['/owners/:path*', '/clients/:path*'],
// };
