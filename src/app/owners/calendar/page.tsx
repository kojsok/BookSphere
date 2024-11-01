
'use client'
import React, { useState } from 'react';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([
        { date: '2024-11-01', time: '10:00', client: 'Иван' },
        { date: '2024-11-01', time: '11:00', client: 'Мария' },
        { date: '2024-11-01', time: '14:00', client: 'Алексей' },
        // Добавьте дополнительные записи по мере необходимости
    ]);


    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const filteredAppointments = appointments.filter(appointment =>
        format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    console.log(date);

    return (
        <div>
            {/* <Calendar onClickDay={handleDateClick} /> */}
            {/* <Calendar  /> */}

            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={3}
                // onSelect={(selectedDate) => {
                //     setDate(selectedDate);
                //     console.log('Выбрана дата:', selectedDate);
                //   }}
                className="rounded-md border"
            />

            {selectedDate && (
                <div className="mt-4">
                    <h2 className="text-xl">Записи на {format(selectedDate, 'PPP')}</h2>
                    <table className="min-w-full border border-gray-300 mt-2">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Время</th>
                                <th className="border border-gray-300 px-4 py-2">Клиент</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
                                        <td className="border border-gray-300 px-4 py-2">{appointment.client}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2" colSpan="2">Нет записей на этот день</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;