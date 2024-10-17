import { ThemeSwitcher } from "@/components/theme-switcher";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "./header-auth";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b h-16 w-full">
      <div className="container mx-auto flex items-center justify-between py-3 px-5">
        <div className="flex items-center space-x-5 font-semibold">
          <Link href="/" className="text-lg">
            BookSphera
          </Link>
        </div>
        <div className="flex items-center space-x-10">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;