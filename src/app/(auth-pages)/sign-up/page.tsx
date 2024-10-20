import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <form className="flex flex-col min-w-64 max-w-md mx-auto border border-gray-300 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center">Зарегистрироваться</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />

        <Label htmlFor="name">Имя</Label>
        <Input name="name" placeholder="Your Name" required />

        <Label htmlFor="role">Роль</Label>
        <select name="role" className="border rounded p-2" required>
          <option value="client">Клиент</option>
          <option value="owner">Владелец бизнеса</option>
        </select>

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          required
        />

        <Label htmlFor="password_confirmation">Confirm password</Label>
        <Input
          type="password"
          name="password_confirmation"
          placeholder="Your password confirmation"
          minLength={6}
          required
        />

        <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          Зарегистрироваться
        </SubmitButton>

        <p className="text-xs text-gray-500 text-center mt-2">
          Уже есть аккаунт?{" "}
          <Link className="text-blue-600 font-medium underline ml-1" href="/sign-in">
            Войти
          </Link>
        </p>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
