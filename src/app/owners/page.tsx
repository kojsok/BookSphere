'use client';
import { useEffect, useState } from "react";
import { addServicesAction, getServicesAction } from "./actionsOwners";
import { Building, Clock, Info, Mail, Phone, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Owner {
    id: number;
    business_name: string;
    description: string;
    phone_number: string;
    name: string;
    email: string;
    services: string;
    working_hours: string;
}

export default function OwnersPage() {
    // const [ownerData, setOwnerData] = useState(null);
    const [ownerData, setOwnerData] = useState<Owner[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    // Хук useEffect не должен быть асинхронным, но можно создать асинхронную функцию внутри него
    useEffect(() => {
        // Асинхронная функция для получения данных
        const fetchData = async () => {
            const result = await getServicesAction();

            if (error) {
                setError(error);
            } else if (Array.isArray(result)) {
                setOwnerData(result);
                setError(null); // Сброс ошибки, если данные успешно загружены
            } else if (result.error) {
                setError(result.error);
            } else {
                console.error('Unexpected result type:', result);
            }
        };

        fetchData(); // Вызываем асинхронную функцию внутри useEffect
    }, [message, error]); // Пустой массив зависимостей, чтобы эффект сработал только при монтировании

    if (error) {
        return <p>{error}</p>;
    }

    if (!ownerData) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!ownerData.length) {
        return <p>Загрузка данных...</p>;
    }

    const handleSubmit = async (formData: FormData) => {
        try {
            const result = await addServicesAction(formData);
            setMessage(result.error ?? result.success ?? ""); // Установка сообщения на основе результата действия
        } catch (error) {
            setMessage("Произошла ошибка при добавлении данных: " + error);
        }
    };
    //!можно обновлять данные через клик на кнопку
    // const handleSubmit = async (formData: FormData) => {
    //     try {
    //         const result = await addServicesAction(formData);
    //         setMessage(result.error ?? result.success ?? "");
    
    //         if (!result.error) {
    //             // Перезагружаем данные после успешного добавления
    //             const updatedData = await getServicesAction();
    //             setOwnerData(updatedData);
    //         }
    //     } catch (error) {
    //         setMessage("Произошла ошибка при добавлении данных: " + error);
    //     }
    // };

    return (
        <div className="p-6 w-full max-w-full justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Карточка владельца</h2>
            {ownerData.map((owner: Owner) => (
                <div key={owner.id} className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
                    <div className="flex items-center mb-2">
                        <Building className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-xl font-semibold">{owner.business_name}</h3>
                    </div>
                    <div className="flex items-center mb-2">
                        <User className="w-5 h-5 text-gray-500 mr-2" />
                        <p className="text-gray-700">Владелец: {owner.name}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <Mail className="w-5 h-5 text-gray-500 mr-2" />
                        <p className="text-gray-700">Email: {owner.email}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <Phone className="w-5 h-5 text-green-500 mr-2" />
                        <p className="text-gray-700">Телефон: {owner.phone_number}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <Info className="w-5 h-5 text-yellow-500 mr-2" />
                        <p className="text-gray-700">Описание: {owner.description}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-purple-500 mr-2" />
                        <p className="text-gray-700">Рабочие часы: {owner.working_hours}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <Building className="w-5 h-5 text-pink-500 mr-2" />
                        <p className="text-gray-700">Услуги: {owner.services}</p>
                    </div>
                </div>
            ))}

            {/* Add Service Form */}
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-6">Добавить информацию о компании</h1>

                <form
                    className="space-y-6"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleSubmit(formData);
                    }}
                >
                    <div>
                        <label htmlFor="business_name" className="block text-sm font-medium">
                            Название компании или имя владельца
                        </label>
                        <Input type="text" id="business_name" name="business_name" required />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Описание
                        </label>
                        <Textarea id="description" name="description" required />
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium">
                            Контактный номер телефона
                        </label>
                        <Input type="text" id="phone_number" name="phone_number" required />
                    </div>

                    {/* Вывод сообщения об успехе или ошибке */}
                    {message && (
                        <p className={`text-sm ${message.includes("ошибка") ? "text-red-600" : "text-green-600"}`}>
                            {message}
                        </p>
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Добавить информацию о компании
                    </Button>
                </form>
            </div>
        </div>
    );
}

