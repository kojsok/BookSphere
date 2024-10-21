import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-2 items-center">
      <Badge variant={"outline"} className="font-normal">
        Environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button
          asChild
          size="sm"
          variant={"ghost"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
        >
          <Link href="/sign-in">Войти</Link>
        </Button>
        {/* <Button
          asChild
          size="sm"
          variant={"default"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
        >
          <Link href="/sign-up">Зарегистрироваться</Link>
        </Button> */}
      </div>
    </div>
  );
}