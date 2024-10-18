import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}



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
