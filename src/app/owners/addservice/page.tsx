// src/app/add-business/page.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addServicesAction } from "./actions";
import { FormMessage, Message } from "@/components/form-message";

export default function AddService({ searchParams }: { searchParams: Message }) {
 

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Добавить информацию о компании</h1>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="business_name" className="block text-sm font-medium">
            Название компании или имя владельца
          </label>
          <Input
            type="text"
            id="business_name"
            name="business_name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Описание
          </label>
          <Textarea
            id="description"
            name="description"
            required
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium">
            Контактный номер телефона
          </label>
          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="services" className="block text-sm font-medium text-gray-700">
            Услуги (JSON формат)
          </label>
          <Textarea
            id="services"
            name="services"
            placeholder={`[{"service_id":"uuid-1","name":"Стрижка","description":"Стрижка","price":1500,"duration_minutes":30}]`}
            required
          />
        </div> */}

        {/* <div>
          <label htmlFor="working_hours" className="block text-sm font-medium text-gray-700">
            Рабочие часы (JSON формат)
          </label>
          <Textarea
            id="working_hours"
            name="working_hours"
            placeholder={`[{"day_of_week":1,"start_time":"09:00","end_time":"18:00"}]`}
            required
          />
        </div> */}
        <FormMessage message={searchParams} />
        <Button type="submit" formAction={addServicesAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Добавить информацию о компании
        </Button>
      </form>
    </div>
  );
}