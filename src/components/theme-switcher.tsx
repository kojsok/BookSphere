"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // По умолчанию система устанавливается на "system"
  useEffect(() => {
    setMounted(true);
    if (theme === undefined) {
      setTheme("system");
    }
  }, [theme, setTheme]);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun size={ICON_SIZE} className="text-muted-foreground" />
      ) : (
        <Moon size={ICON_SIZE} className="text-muted-foreground" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
