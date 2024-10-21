import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function InfoErrorPage() {
    // Инициализация клиента Supabase
    const supabase = createClient();

    // Получаем информацию о пользователе из Supabase
    const { data: { user } } = await supabase.auth.getUser();

    // Получаем информацию о роли пользователя
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user?.id) // Используем id пользователя из Supabase
      .single();
    

    if (user && userData?.role) {
        return (
            <div className="flex flex-1 flex-col justify-center items-center h-screen text-center">
                <p className="text-md w-1/2">
                    Вы зарегистрированы как <span className="font-bold">{userData?.role}</span>,
                    возможно, у вас нет доступа к этой странице.
                    Если вы уже зарегистрированы и хотите увидеть эту страницу, обратитесь к администратору!
                </p>
                <Link href="/" className="text-blue-600 font-medium underline ml-1">Перейти на главную</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col justify-center items-center h-screen text-center">
            <p className="text-md w-1/2 ">
                У вас недостаточно прав для просмотра этой страницы!
            </p>

            <Link href="/" className="text-blue-600 font-medium underline ml-1">Перейти на главную</Link>
        </div>
    );
}
