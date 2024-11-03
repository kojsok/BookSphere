import { type NextRequest, NextResponse } from 'next/server';
// import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';


export async function updateSessionUser(request: NextRequest) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { ok: false, status: 401, statusText: 'Unauthorized', user: null };
  }
  console.log(request.url);
  return { ok: true, status: 200, statusText: 'Authorized', user };
}

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
    return NextResponse.next();
  }

  // Обновляем сессию пользователя
  const session = await updateSessionUser(request);
  console.log('Middleware is working==========:', request.url);
  console.log("Session=======:", session.ok, session.status, session.statusText);

  const supabase = createClient();

  // Получаем информацию о роли пользователя из Supabase
  const { data} = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user?.id) // Используем id пользователя из сессии
    .single();

  if (!session.ok && !data && urlPath.startsWith('/owners')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (!session.ok && !data && urlPath.startsWith('/clients')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const userRole = data?.role;

  // Проверяем роль для маршрутов /owners и /clients
  if (urlPath.startsWith('/owners') && userRole !== 'owner') {
    return NextResponse.redirect(new URL('/infoerrorpage', request.url));
  }

  if (urlPath.startsWith('/clients') && userRole !== 'client') {
    return NextResponse.redirect(new URL('/infoerrorpage', request.url));
  }

  const response = NextResponse.next();
  //кэшируем файлы на 1 минуту и 2 минуты перед обновлением сессии 
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
  

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/owners/:path*',
    '/clients/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};


//!вообще не трогать
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
//   console.log('Middleware is working==========:', request.url);
//   //!для отладки сессии 
//   // console.log('Session:', session);
//   console.log("Session=======:", session.ok, session.status, session.statusText);

//   const supabase = createClient();

//   // Получаем информацию о пользователе из Supabase
//   const { data: { user } } = await supabase.auth.getUser();

//   // Если пользователя нет, перенаправляем на страницу входа при попытке доступа к /admin
//   if (!session.ok && !user && urlPath.startsWith('/owners')) {
//     const loginUrl = new URL('/sign-in', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Если пользователь есть, получаем его роль из таблицы users
//   if (user) {
//     const { data: userData, error: userError } = await supabase
//       .from('users')
//       .select('role')
//       .eq('id', user.id) // Используем id пользователя из Supabase
//       .single();

//     if (userError || !userData) {
//       // console.log('Error fetching user role:', userError);
//       const forbiddenUrl = new URL('/sign-in', request.url);
//       return NextResponse.redirect(forbiddenUrl); // Если ошибка при получении данных, перенаправляем
//     }

//     const userRole = userData.role;

//     // Проверяем роль для маршрута /owners/
//     if (urlPath.startsWith('/owners') && userRole !== 'owner') {
//       const forbiddenUrl = new URL('/infoerrorpage', request.url); // Редирект на страницу 403 или другой URL
//       return NextResponse.redirect(forbiddenUrl);
//     }

//     // Проверяем роль для маршрута /clients/
//     if (urlPath.startsWith('/clients') && userRole !== 'client') {
//       const forbiddenUrl = new URL('/infoerrorpage', request.url); // Редирект на страницу 403 или другой URL
//       return NextResponse.redirect(forbiddenUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/owners/:path*',
//     '/clients/:path*',
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };


