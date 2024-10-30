'use client'
import { FC } from "react";
import InputField, { InputSample } from "../shared/InputField";
import { SubmitButton } from "../submit-button";
// import { ServicesDefault } from "@/utils/types/services";
import { addService } from "@/utils/actions/servicesActions";
import { ServicesDefault } from "@/utils/types/services";
import { Label } from "@radix-ui/react-label";

interface ServicesFromProps {
  mode?: 'edit' | 'new',
  defaultValues?: ServicesDefault
}

const initialValues: ServicesDefault = {
  name: '',
  price: 0,
  hours: 0,
  minutes: 0
}


const ServicesForm: FC<ServicesFromProps> = ({ mode = 'new', defaultValues = initialValues }) => {
  const title = mode === 'edit' ? 'Обновить услугу' : 'Добавить услугу';
  const { name, price, hours, minutes } = defaultValues
  return (
    <div className="flex flex-col gap-4 w-[min(100%,300px)]">
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      <form
        className="flex flex-col gap-6"
        autoComplete="off"
        action={
          async (formData: FormData) => {
            await addService(formData)
          }}
      >
        <InputField required={true} label="Название услуги" id="name" type='text' name="name" defaultValue={name} />
        <InputField label="Цена" id="price" type="number" name="price" defaultValue={price} />

        <div>
          <Label htmlFor="hours" className="text-xs inline-block mb-1.5">Длительность</Label>
          <div className="flex gap-4">

            <InputField id="hours" type='number' name="hours" defaultValue={hours}>
              <InputSample className="text-xs">hh</InputSample>
            </InputField>
            <InputField id="minutes" type='number' name="minutes" defaultValue={minutes}>
              <InputSample className="text-xs">min</InputSample>
            </InputField>
          </div>
        </div>
        <SubmitButton pendingText="Отправка...">Отправить</SubmitButton>
      </form>
    </div>
  );
}

export default ServicesForm;