import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form
      action={signInAction} // Передаем action формы
      className="flex-1 flex flex-col min-w-64 border border-gray-300 p-6 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-semibold text-center">Войти</h1>
      <p className="text-center text-sm text-gray-600 mt-2">Для входа введите e-mail и пароль</p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In...">
          Войти
        </SubmitButton>

        {/* Отображаем сообщения об ошибках */}
        <FormMessage  message={searchParams} />

        <p className="text-xs text-gray-500 flex justify-center mt-4">
          <Link
            className="text-blue-600 font-medium underline ml-1"
            href="/recover-password"
          >
            Забыли пароль?
          </Link>
        </p>
        <p className="text-xs text-gray-500 flex justify-center mt-4">
          Нет аккаунта?{" "}
          <Link
            className="text-blue-600 font-medium underline ml-1"
            href="/sign-up"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </form>
  );
}

//!todo проверить
// import { signInAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/form-message";
// import { SubmitButton } from "@/components/submit-button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// export default function Login({ searchParams }: { searchParams: Message }) {
//   return (
//     <form className="flex-1 flex flex-col min-w-64 border border-gray-300 p-6 rounded-lg shadow-md">
//       <h1 className="text-2xl font-semibold text-center">Войти</h1>
//       <p className="text-center text-sm text-gray-600 mt-2">Для входа введите e-mail и пароль</p>
//       <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//         <Label htmlFor="email">Email</Label>
//         <Input name="email" placeholder="you@example.com" required />
//         <Label htmlFor="password">Password</Label>
//         <Input
//           type="password"
//           name="password"
//           placeholder="Your password"
//           required
//         />
//         <SubmitButton pendingText="Signing In..." formAction={signInAction}>
//           Войти
//         </SubmitButton>
//         <p className="text-xs text-gray-500 flex justify-center mt-4">
//           <Link
//             className="text-blue-600 font-medium underline ml-1"
//             href="/recover-password"
//           >
//             Забыли пароль?
//           </Link>
//         </p>
//         <p className="text-xs text-gray-500 flex justify-center mt-4">
//           Нет аккаунта?{" "}
//           <Link
//             className="text-blue-600 font-medium underline ml-1"
//             href="/sign-up"
//           >
//             Зарегистрироваться
//           </Link>
//         </p>
//         <FormMessage message={searchParams} />
//       </div>
//     </form>
//   );
// }

