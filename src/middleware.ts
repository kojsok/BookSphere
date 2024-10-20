import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server';
// import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  // Обновляем сессию пользователя
  // const supabase = createClient()
  // const { data: session } = await supabase.auth.getSession()
  
  const session = await updateSession(request)
  console.log('Middleware is working:', request.url)
  console.log('Session:', session);

  const supabase = createClient()
  // Получаем информацию о пользователе из supabaseResponse
  const {data: { user },} = await supabase.auth.getUser() // Измените это, если метод получения пользователя другой
    console.log('User:', user);

  // Проверяем авторизацию для всех маршрутов, начинающихся с /admin
  if (!session.ok && request.nextUrl.pathname.startsWith('/admin')) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    const loginUrl = new URL('/sign-in', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Если авторизован или маршрут не требует авторизации, продолжаем
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Проверка всех маршрутов, которые начинаются с /admin
     */
    '/admin/:path*', // это добавляет поддержку всех маршрутов после /admin/
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}