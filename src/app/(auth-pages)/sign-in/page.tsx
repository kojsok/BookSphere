import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Войти</h1>
      <p className="text-sm text-foreground">
        Нет аккаунта?{" "}
        <Link
          className="text-foreground font-medium underline"
          href="/sign-up"
        >
          Зарегистрироваться
        </Link>
      </p>
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
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Войти
        </SubmitButton>
        <p className="text-sm text-foreground">
          <Link
            className="text-foreground font-medium underline"
            href="/recover-password"
          >
            Забыли пароль?
          </Link>
        </p>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

