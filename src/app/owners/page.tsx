'use client';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from '@supabase/auth-js';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, Menu, PlusCircle, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  name: string;
  description: string;
};

type WorkingHour = {
  day: string;
  from: string;
  to: string;
};

export default function OwnersPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [newService, setNewService] = useState<Service>({ name: '', description: '' });
  const [newWorkingHour, setNewWorkingHour] = useState<WorkingHour>({ day: '', from: '', to: '' });

  useEffect(() => {
    const supabase = createClient();
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        redirect("/sign-in");
        return;
      }

      setUser(user as SupabaseUser);

      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !userData) {
        console.error("Ошибка при получении роли пользователя:", error?.message);
        redirect("/sign-in");
        return;
      }

      setRole(userData.role);

      if (userData.role === "client") {
        redirect("/clients");
      } else if (!userData.role) {
        redirect("/protected");
      }
    };

    fetchUserData();
  }, []);

  const addService = () => {
    setServices([...services, newService]);
    setNewService({ name: '', description: '' });
  };

  const addWorkingHour = () => {
    setWorkingHours([...workingHours, newWorkingHour]);
    setNewWorkingHour({ day: '', from: '', to: '' });
  };

  //!нужно переделать
  if (!user || !role) {
    return <div>Загрузка...1</div>;
    // redirect("/sign-in");
    // return
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar */}
      <div className={cn("transition-all duration-300", isSidebarOpen ? "w-full md:w-64" : "w-16", "shadow-md")}>
        <div className="flex justify-between">
          <h1 className={cn(isSidebarOpen ? "block" : "hidden", "text-lg font-bold")}>Dashboard</h1>
          <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Briefcase />
                {isSidebarOpen && <span>Services</span>}
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Clock />
                {isSidebarOpen && <span>Working Hours</span>}
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4">Business Dashboard</h2>

        {/* Add Service Form */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Add Service</h3>
          <div className="space-y-4">
            <Input
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <Textarea
              placeholder="Service Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            />
            <Button variant="outline" onClick={addService}><PlusCircle />
              Add Service
            </Button>
          </div>
        </div>

        {/* Add Working Hours Form */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Add Working Hours</h3>
          <div className="space-y-4">
            <Input
              placeholder="Day"
              value={newWorkingHour.day}
              onChange={(e) => setNewWorkingHour({ ...newWorkingHour, day: e.target.value })}
            />
            <Input
              placeholder="From"
              value={newWorkingHour.from}
              onChange={(e) => setNewWorkingHour({ ...newWorkingHour, from: e.target.value })}
            />
            <Input
              placeholder="To"
              value={newWorkingHour.to}
              onChange={(e) => setNewWorkingHour({ ...newWorkingHour, to: e.target.value })}
            />
            <Button variant={"outline"} onClick={addWorkingHour}><PlusCircle />
              Add Working Hour
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom mobile menu */}
      <div className="fixed bottom-0 w-full shadow-md md:hidden">
        <div className="flex justify-center p-4 items-center">
          <Button variant="ghost"><Briefcase />Services</Button>
          <Button variant="ghost"><Clock />Working Hours</Button>
        </div>
      </div>
    </div>
  );
}


//! тут нужно доработать стили
// 'use client';
// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { User as SupabaseUser } from '@supabase/auth-js';
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Briefcase, Clock, Menu, PlusCircle, X } from "lucide-react";
// import { cn } from "@/utils/cn";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// type Service = {
//   name: string;
//   description: string;
// };

// type WorkingHour = {
//   day: string;
//   from: string;
//   to: string;
// };

// export default function OwnersPage() {
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [services, setServices] = useState<Service[]>([]);
//   const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
//   const [newService, setNewService] = useState<Service>({ name: '', description: '' });
//   const [newWorkingHour, setNewWorkingHour] = useState<WorkingHour>({ day: '', from: '', to: '' });

//   useEffect(() => {
//     const supabase = createClient();
//     const fetchUserData = async () => {
//       const { data: { user } } = await supabase.auth.getUser();

//       if (!user) {
//         redirect("/sign-in");
//         return;
//       }

//       setUser(user as SupabaseUser);

//       const { data: userData, error } = await supabase
//         .from("users")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       if (error || !userData) {
//         console.error("Ошибка при получении роли пользователя:", error?.message);
//         redirect("/sign-in");
//         return;
//       }

//       setRole(userData.role);

//       if (userData.role === "client") {
//         redirect("/clients");
//       } else if (!userData.role) {
//         redirect("/protected");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const addService = () => {
//     setServices([...services, newService]);
//     setNewService({ name: '', description: '' });
//   };

//   const addWorkingHour = () => {
//     setWorkingHours([...workingHours, newWorkingHour]);
//     setNewWorkingHour({ day: '', from: '', to: '' });
//   };

//   if (!user || !role) {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       {/* Sidebar */}
//       <div className={cn("transition-all duration-300", isSidebarOpen ? "w-full md:w-64" : "w-16", "shadow-md")}>
//         <div className="flex justify-between p-4">
//           <h1 className={cn(isSidebarOpen ? "block" : "hidden", "text-lg font-bold")}>Dashboard</h1>
//           <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             {isSidebarOpen ? <X /> : <Menu />}
//           </Button>
//         </div>
//         <nav className={cn(isSidebarOpen ? "block" : "hidden", "md:block")}>
//           <ul className="space-y-4">
//             <li><Button variant="ghost"><Briefcase /> Services</Button></li>
//             <li><Button variant="ghost"><Clock /> Working Hours</Button></li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-4 md:p-6">
//         <h2 className="text-xl font-bold mb-4">Business Dashboard</h2>

//         {/* Add Service Form */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Add Service</h3>
//           <div className="space-y-4">
//             <Input
//               placeholder="Service Name"
//               value={newService.name}
//               onChange={(e) => setNewService({ ...newService, name: e.target.value })}
//             />
//             <Textarea
//               placeholder="Service Description"
//               value={newService.description}
//               onChange={(e) => setNewService({ ...newService, description: e.target.value })}
//             />
//             <Button variant="outline" onClick={addService}><PlusCircle />
//               Add Service
//             </Button>
//           </div>
//         </div>

//         {/* Add Working Hours Form */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Add Working Hours</h3>
//           <div className="space-y-4">
//             <Input
//               placeholder="Day"
//               value={newWorkingHour.day}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, day: e.target.value })}
//             />
//             <Input
//               placeholder="From"
//               value={newWorkingHour.from}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, from: e.target.value })}
//             />
//             <Input
//               placeholder="To"
//               value={newWorkingHour.to}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, to: e.target.value })}
//             />
//             <Button variant={"outline"} onClick={addWorkingHour}><PlusCircle />
//               Add Working Hour
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom mobile menu */}
//       <div className="fixed bottom-0 w-full shadow-md md:hidden">
//         <div className="flex justify-center p-4 items-center">
//           <Button variant="ghost"><Briefcase />Services</Button>
//           <Button variant="ghost"><Clock />Working Hours</Button>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client"; // Измените путь на клиентский
// import { User as SupabaseUser } from '@supabase/auth-js';
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Briefcase, Clock, Menu, PlusCircle, X } from "lucide-react";
// import { cn } from "@/utils/cn";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// type Service = {
//   name: string;
//   description: string;
// };

// type WorkingHour = {
//   day: string;
//   from: string;
//   to: string;
// };



// export default function OwnersPage() {
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   // const router = useRouter();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [services, setServices] = useState<Service[]>([]);
//   const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
//   const [newService, setNewService] = useState<Service>({ name: '', description: '' });
//   const [newWorkingHour, setNewWorkingHour] = useState<WorkingHour>({ day: '', from: '', to: '' });



  

//   useEffect(() => {
//     // Создание клиента на стороне клиента
//     const supabase = createClient();

//     // Асинхронная функция для получения данных пользователя
//     const fetchUserData = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         // Перенаправление на страницу входа, если нет пользователя
//         // router.push("/sign-in");
//         redirect("/sign-in");
//         return;
//       }

//       setUser(user as SupabaseUser);

//       const { data: userData, error } = await supabase
//         .from("users")
//         .select("role")
//         .eq("id", user.id)
//         .single();

//       if (error || !userData) {
//         console.error("Ошибка при получении роли пользователя:", error?.message);
//         redirect("/sign-in");
//         return;
//       }

//       setRole(userData.role);

//       // Логика перенаправления в зависимости от роли
//       if (userData.role === "client") {
//         redirect("/clients");
//       } else if (!userData.role) {
//         redirect("/protected");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const addService = () => {
//     setServices([...services, newService]);
//     setNewService({ name: '', description: '' });
//   };

//   const addWorkingHour = () => {
//     setWorkingHours([...workingHours, newWorkingHour]);
//     setNewWorkingHour({ day: '', from: '', to: '' });
//   };

//   //!тут исправить срочно
//   if (!user || !role) {
//     return <div>Загрузка...</div>; // Показать загрузку пока данные загружаются
//   }

//   return (
//     // <div>
//     //   <h1>Страница для владельцев {user.email}</h1>
//     //   <p>Добро пожаловать, владелец {role}!</p>
//     // </div>

//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className={cn("transition-all duration-300", isSidebarOpen ? "w-64" : "w-16", "shadow-md")}>
//         <div className="flex justify-between p-4">
//           <h1 className={cn(isSidebarOpen ? "block" : "hidden", "text-lg font-bold")}>Dashboard</h1>
//           <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             {isSidebarOpen ? <X /> : <Menu />}
//           </Button>
//         </div>
//         <nav className={cn(isSidebarOpen ? "block" : "hidden")}>
//           <ul className="space-y-4">
//           <li><Button variant="ghost"><Briefcase /> Services</Button></li>
//           <li><Button variant="ghost"><Clock /> Working Hours</Button></li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-xl font-bold mb-4">Business Dashboard</h2>

//         {/* Add Service Form */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Add Service</h3>
//           <div className="space-y-4">
//             <Input
//               placeholder="Service Name"
//               value={newService.name}
//               onChange={(e) => setNewService({ ...newService, name: e.target.value })}
//             />
//             <Textarea
//               placeholder="Service Description"
//               value={newService.description}
//               onChange={(e) => setNewService({ ...newService, description: e.target.value })}
//             />
//             <Button variant="outline" onClick={addService}><PlusCircle />
//               Add Service
//             </Button>
//           </div>
//         </div>

//         {/* Add Working Hours Form */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Add Working Hours</h3>
//           <div className="space-y-4">
//             <Input
//               placeholder="Day"
//               value={newWorkingHour.day}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, day: e.target.value })}
//             />
//             <Input
//               placeholder="From"
//               value={newWorkingHour.from}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, from: e.target.value })}
//             />
//             <Input
//               placeholder="To"
//               value={newWorkingHour.to}
//               onChange={(e) => setNewWorkingHour({ ...newWorkingHour, to: e.target.value })}
//             />
//             <Button variant={"outline"} onClick={addWorkingHour}><PlusCircle />
//               Add Working Hour
//             </Button>
            
//           </div>
//         </div>
//       </div>

//       {/* Bottom mobile menu */}
//       <div className="fixed bottom-0 w-full bg-white shadow-md md:hidden">
//         <div className="flex justify-around p-4">
//           <Button variant="ghost"><Briefcase />Services</Button>
//           <Button variant="ghost"><Clock />Working Hours</Button>
//         </div>
//       </div>
//     </div>
//   );
// }



//!не трогать
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// export default async function OwnersPage() {
//   // Инициализация клиента Supabase
//   const supabase = createClient();

//   // Получение текущего пользователя
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Проверка, залогирован ли пользователь
//   if (!user) {
//     // Если пользователь не залогирован, перенаправляем на страницу входа
//     return redirect("/sign-in");
//   }

//   // Получение информации о пользователе из таблицы users
//   const { data: userData, error: userError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   // Проверка на ошибки при запросе к таблице
//   if (userError || !userData) {
//     console.error("Ошибка при получении роли пользователя:", userError?.message);
//     return redirect("/sign-in");
//   }

//   // // Проверка роли пользователя
//   // if (userData.role !== "owner") {
//   //   // Если роль пользователя не owner, перенаправляем на защищённую страницу
//   //   return redirect("/protected");
//   // }

//   // Проверка роли пользователя
//   if (userData.role === "client") {
//     // Если роль пользователя client, перенаправляем на страницу клиентов
//     return redirect("/clients");
//   } else if (!userData.role) {
//     // Если у пользователя нет роли, перенаправляем на защищённую страницу
//     return redirect("/protected");
//   }

//   // Если роль owner, отображаем страницу владельцев
//   return (
//     <div>
//       <h1>Страница для владельцев {user.email}</h1>
//       <p>Добро пожаловать, владелец {userData.role}!</p>
//     </div>
//   );
// }
