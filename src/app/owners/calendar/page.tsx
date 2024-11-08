// 'use client'
// import React, { useEffect, useState } from 'react';
// import { format, isSameDay, parseISO } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import { Badge } from '@/components/ui/badge';

// const CalendarComponent = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [appointments, setAppointments] = useState([
//         { date: '2024-11-02', time: '10:00', client: 'Иван' },
//         { date: '2024-11-02', time: '11:00', client: 'Мария' },
//         { date: '2024-11-02', time: '14:00', client: 'Алексей' },
//     ]);

//     const [monthsToShow, setMonthsToShow] = useState(2);
//     const [date, setDate] = useState(new Date());

//     useEffect(() => {
//         const updateMonthsToShow = () => {
//             if (window.innerWidth < 768) {
//                 setMonthsToShow(1); // один месяц для экрана меньше md
//             } else {
//                 setMonthsToShow(2); // два месяца для экрана больше или равного md
//             }
//         };

//         updateMonthsToShow();
//         window.addEventListener('resize', updateMonthsToShow);

//         return () => window.removeEventListener('resize', updateMonthsToShow);
//     }, []);

//     const filteredAppointments = appointments.filter(appointment =>
//         format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
//     );

//     const getAppointmentCountForDate = (date) => {
//         return appointments.filter(appointment =>
//             isSameDay(parseISO(appointment.date), date)
//         ).length;
//     };

//     interface CustomDayProps {
//         date: Date;
//         selected?: boolean;
//         className?: string;
//         [key: string]: any; // для остальных props, если нужно
//     }

//     const CustomDay: React.FC<CustomDayProps> = ({ date, selected, className, ...rest }) => {
//         if (!date) return null; // Return a React fragment instead of null

//         const appointmentCount = getAppointmentCountForDate(date);
//         const isToday = isSameDay(date, new Date());
//         const isSelected = isSameDay(date, selectedDate);

//         return (
//             <div
//                 className={`relative flex items-center justify-center w-9 h-9 rounded-lg 
//                     ${isToday ? 'bg-orange-500' : ''} 
//                     ${isSelected ? 'bg-orange-500 text-white' : ''}
//                     ${className}`}
//                 {...rest} // Передаем только те пропсы, которые не являются атрибутами DOM
//                 onClick={() => setSelectedDate(date)}
//             >
//                 <span>{format(date, 'd')}</span>
//                 {appointmentCount > 0 && (
//                     <Badge
//                         variant="outline"
//                         className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full text-[8px] bg-red-500"
//                     >
//                         {appointmentCount}
//                     </Badge>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-col p-4 w-full justify-center mx-auto max-w-2xl">
//             <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={(day) => day && setDate(day)}
//                 numberOfMonths={monthsToShow}
//                 className="rounded-md border justify-center mx-auto"
//                 components={{ Day: CustomDay }}
//             />

//             {selectedDate && (
//                 <div className="mt-4">
//                     <h2 className="text-xl">Записи на {format(selectedDate, 'PPP')}</h2>
//                     <table className="min-w-full border border-gray-300 mt-2">
//                         <thead>
//                             <tr>
//                                 <th className="border border-gray-300 px-4 py-2">Время</th>
//                                 <th className="border border-gray-300 px-4 py-2">Клиент</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredAppointments.length > 0 ? (
//                                 filteredAppointments.map((appointment, index) => (
//                                     <tr key={index}>
//                                         <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
//                                         <td className="border border-gray-300 px-4 py-2">{appointment.client}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td className="border border-gray-300 px-4 py-2" colSpan={2}>Нет записей на этот день</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CalendarComponent;





// 'use client';
// import React, { useEffect, useState } from 'react';
// import { format } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';

// const CalendarComponent = () => {
//     const [date, setDate] = useState(new Date());
//     const [appointments, setAppointments] = useState([
//         { date: '2024-11-02', time: '10:00', client: 'Иван' },
//         { date: '2024-11-02', time: '11:00', client: 'Мария' },
//         { date: '2024-11-02', time: '14:00', client: 'Алексей' },
//         // Добавьте дополнительные записи по мере необходимости
//     ]);

//     const [monthsToShow, setMonthsToShow] = useState(2);

//     useEffect(() => {
//         const updateMonthsToShow = () => {
//             setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
//         };

//         updateMonthsToShow();
//         window.addEventListener('resize', updateMonthsToShow);

//         return () => window.removeEventListener('resize', updateMonthsToShow);
//     }, []);

//     const filteredAppointments = appointments.filter(appointment =>
//         format(new Date(appointment.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
//     );

//     return (
//         <div className="flex flex-col p-4 w-full justify-center mx-auto max-w-2xl">
//             <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={(day: Date | undefined) => setDate(day || new Date())}
//                 // onSelect={setDate}
//                 numberOfMonths={monthsToShow}
//                 className="rounded-md border justify-center mx-auto"
//             />

//             {date && (
//                 <div className="mt-4">
//                     <h2 className="text-xl">Записи на {format(date, 'PPP')}</h2>
//                     <table className="min-w-full border border-gray-300 mt-2">
//                         <thead>
//                             <tr>
//                                 <th className="border border-gray-300 px-4 py-2">Время</th>
//                                 <th className="border border-gray-300 px-4 py-2">Клиент</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredAppointments.length > 0 ? (
//                                 filteredAppointments.map((appointment, index) => (
//                                     <tr key={index}>
//                                         <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
//                                         <td className="border border-gray-300 px-4 py-2">{appointment.client}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td className="border border-gray-300 px-4 py-2" colSpan={2}>На эту дату нет записей</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CalendarComponent;

'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button'; // Импорт кнопки из shadcn
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Импорт таблицы из shadcn
import { Edit, Trash2 } from 'lucide-react'; // Импорт иконок Lucide

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([
        { id: 1, date: '2024-11-02', time: '10:00', client: 'Иван' },
        { id: 2, date: '2024-11-02', time: '11:00', client: 'Мария' },
        { id: 3, date: '2024-11-02', time: '14:00', client: 'Алексей' },
        // Добавьте дополнительные записи по мере необходимости
    ]);

    const [monthsToShow, setMonthsToShow] = useState(2);

    useEffect(() => {
        const updateMonthsToShow = () => {
            setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
        };

        updateMonthsToShow();
        window.addEventListener('resize', updateMonthsToShow);

        return () => window.removeEventListener('resize', updateMonthsToShow);
    }, []);

    const filteredAppointments = appointments.filter(appointment =>
        format(new Date(appointment.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    const handleDelete = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    };

    const handleEdit = (id) => {
        // Логика редактирования (можно открыть модальное окно для редактирования)
        console.log('Editing appointment with id:', id);
    };

    return (
        <div className="flex flex-col p-4 w-full justify-center mx-auto max-w-2xl">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => setDate(day || new Date())}
                numberOfMonths={monthsToShow}
                className="rounded-md border justify-center mx-auto"
            />

            {date && (
                <div className="mt-4">
                    <h2 className="text-xl">Записи на {format(date, 'PPP')}</h2>
                </div>
            )}
            <div className="overflow-x-auto">
                <Table className="rounded-md border sm:min-w-full">
                    <TableCaption>Все записи</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Время</TableHead>
                            <TableHead className="text-center">Клиент</TableHead>
                            <TableHead className="text-center">Контакты</TableHead>
                            <TableHead className="text-center">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map(appointment => (
                                <TableRow key={appointment.id}>
                                    <TableCell className="text-center">{appointment.time}</TableCell>
                                    <TableCell className="text-center">{appointment.client}</TableCell>
                                    <TableCell className="text-center ">Контакты</TableCell>
                                    <TableCell className="text-center space-x-4">
                                        <Button onClick={() => handleEdit(appointment.id)} variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button onClick={() => handleDelete(appointment.id)} variant="destructive" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="border border-gray-300 px-4 py-2" colSpan={4}>На эту дату нет записей</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CalendarComponent;
