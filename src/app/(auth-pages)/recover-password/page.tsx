import { requestOTPAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RecoverPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex-1 flex flex-col min-w-64 max-w-md mx-auto border border-gray-300 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center">Восcтановить пароль</h1>


      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="you@example.com"
          minLength={6}
          required
        />

        <SubmitButton pendingText="Recovering..." formAction={requestOTPAction}>
          Восcтановить пароль
        </SubmitButton>
        <p className="text-xs text-gray-500 text-center mt-2">
          Нет аккаунта?{" "}
          <Link className="text-blue-600 font-medium underline ml-1" href="/sign-up">
            Зарегистрироваться
          </Link>
        </p>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
