'use client'
import { useContext } from "react";
import InputField, { InputSample } from "../shared/InputField";
import { SubmitButton } from "../submit-button";
import { addOrUpdateService } from "@/utils/actions/servicesActions";
import { ServicesDefault } from "@/utils/types/services";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { ServiceContext } from "./ServicesCard";

const initialValues: ServicesDefault = {
  name: '',
  description: '',
  price: 0,
  hours: 0,
  minutes: 0
}

interface ServicesFormProps {
  onSuccess: () => void
}

const ServicesForm = ({ onSuccess }: ServicesFormProps) => {
  const value = useContext(ServiceContext)
  const { name, price, hours, minutes, description } = value?.defaultValues || initialValues;
  return (
    <form
      className="flex flex-col gap-6"
      autoComplete="off"
      action={
        async (formData: FormData) => {
          await addOrUpdateService(formData)
          onSuccess()
        }}
    >
      {/* скрытое поле для передачи service_id на экшн */}
      <input type="hidden" name="service_id" value={value?.service_id} />

      <InputField required={true} label="Название услуги" id="name" type='text' name="name" defaultValue={name} />
      <Textarea placeholder="Описание услуги" name="description" defaultValue={description} />
      <InputField label="Цена" id="price" type="number" name="price" defaultValue={price} />

      <div>
        <Label htmlFor="hours" className="text-xs inline-block mb-1.5">Длительность</Label>
        <div className="flex gap-4">

          <InputField id="hours" type='number' name="hours" defaultValue={hours}>
            <InputSample className="text-xs">hh</InputSample>
          </InputField>
          <InputField id="minutes" type='number' name="minutes" defaultValue={minutes}>
            <InputSample className="text-xs">mm</InputSample>
          </InputField>
        </div>
      </div>
      <SubmitButton pendingText="Отправка...">Отправить</SubmitButton>
    </form>
  );
}

export default ServicesForm;