'use client';
import { useEffect, useState } from "react";
import { User as SupabaseUser } from '@supabase/auth-js';
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar1, Clock, House, Menu, QrCode, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OwnerPageContentProps {
    user: SupabaseUser | null;
    role: string | null;
}

export default function OwnerPageContent({ user, role }: OwnerPageContentProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Состояние для загрузки

    useEffect(() => {
        if (!user) {
            router.push("/sign-in");
            return;
        }

        if (!role) {
            router.push("/sign-in");
            return;
        }

        if (role === "client") {
            router.push("/clients");
            return;
        }

        // Если всё в порядке, убираем состояние загрузки
        setLoading(false);
    }, [user, role, router]);

    if (loading) {
        return <div>Загрузка...</div>; // Заглушка, пока идет проверка
    }

    return (
        <div className="flex flex-row md:flex-row h-screen w-full">
            {/* Sidebar */}
            <div className={cn("transition-all duration-300 shadow-md", isSidebarOpen ? "w-48 md:w-48" : "w-16", "sm:block hidden")}>
                {/* Sidebar header */}
                <div className={cn(isSidebarOpen ? "flex gap-10 justify-start items-center" : "flex justify-center")}>
                    <h1 className={cn(isSidebarOpen ? "block" : "hidden", "text-lg font-bold")}>BookSphera</h1>
                    <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <nav className={cn(!isSidebarOpen ? "flex justify-center mt-6" : "mt-6")}>
                    <ul className="space-y-4">
                        <li>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <House />
                                {isSidebarOpen && <span>О компании</span>}
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Briefcase />
                                {isSidebarOpen && <span>Услуги</span>}
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Clock />
                                {isSidebarOpen && <span>Рабочие часы</span>}
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Calendar1 />
                                {isSidebarOpen && <span>Календарь</span>}
                            </Button>
                            </li>
                        <li>  
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <QrCode />
                                {isSidebarOpen && <span>QR код</span>}
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            dfgdfgdf
            {/* Bottom mobile menu */}
            <div className="fixed bottom-0 w-full sm:hidden border-t-2">
                <TooltipProvider>
                    <div className="flex gap-16 p-4 justify-center items-center">
                    <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" >
                                    <House style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>О компании</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" >
                                    <Briefcase style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Услуги</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Clock style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Рабочие часы</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Calendar1 style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Календарь</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <QrCode style={{ width: '24px', height: '24px' }} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>QR код</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>

        </div>
    );
}