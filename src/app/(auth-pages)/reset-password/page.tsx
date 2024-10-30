import { recoverPassAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex flex-col min-w-64 max-w-md mx-auto border border-gray-300 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center">Обновить пароль</h1>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Input name="email" type="hidden" value={searchParams?.email} />

        <Label htmlFor="code">Введите One-time password</Label>
        <Input name="code" placeholder="One-time password" required />

        <Label htmlFor="new_password">Пароль</Label>
        <Input
          type="password"
          name="new_password"
          placeholder="Your new password"
          minLength={6}
          required
        />

        <Label htmlFor="password_confirmation">Подтвердить пароль</Label>
        <Input
          type="password"
          name="password_confirmation"
          placeholder="Confirm your new password"
          minLength={6}
          required
        />

        <SubmitButton
          formAction={recoverPassAction}
          pendingText="Recovering password..."
        >
          Обновить
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}