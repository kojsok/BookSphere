'use client'
import { ReactNode, useState } from 'react';
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar1, Clock, House, Menu, QrCode, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from 'next/link';

export default function OwnersLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <div className='flex flex-row items-start'>
      <div className="flex flex-row md:flex-row">
            {/* Sidebar */}
            
            <div className={cn("p-4 transition-all duration-300 shadow-md", isSidebarOpen ? "w-48 md:w-48" : "w-16", "sm:block hidden")}>
                {/* Sidebar header */}
                <p>ЭТО ТЕСТ</p>
                <div className={cn(isSidebarOpen ? "flex gap-4 justify-start items-center" : "flex justify-center")}>
                    <h1 className={cn(isSidebarOpen ? "block" : "hidden", "text-lg font-bold")}>BookSphera</h1>
                    <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <nav className={cn(!isSidebarOpen ? "flex justify-center mt-6" : "mt-6")}>
                    <ul className="space-y-4">
                        <li>
                        <Link href="/owners/">
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <House />
                                {isSidebarOpen && <span>О компании</span>}
                            </Button>
                            </Link>
                        </li>
                        <li>
                        <Link href="/owners/services">
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Briefcase />
                                {isSidebarOpen && <span>Услуги</span>}
                            </Button>
                            </Link>
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
            {/* Проверка и работа тут будут компоненты */}
            {/* <AddService /> */}
            {/* Bottom mobile menu */}
            <div className="fixed bottom-0 w-full sm:hidden border-t-2">
                <TooltipProvider>
                    <div className="flex gap-8 md:gap-16 p-4 justify-between items-center">
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
      
      {children}
    </div>
  );
}