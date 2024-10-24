import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BookSphera запишись в один клик",
  description: "BookSphera запишись в один клик на любую услугу, Бронируй легко с BookSphera – одно касание, и готово!",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground theme-transition">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen w-full max-w-full flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-1 items-center">
              <Navbar />
              <div className="flex w-full h-screen flex-col gap-5">
                {children}
              </div>

              {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-10">
                 Footer content 
              </footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}