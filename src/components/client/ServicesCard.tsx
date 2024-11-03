'use client'

import { getTimePartsFromSec } from "@/lib/getTimePartsFromSec"
import { getHHEndings, getMMEndings } from "@/lib/getWordEnding"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import ServicesDialog from "./ServicesDialog"
import { QueryService, ServicesDefault } from "@/utils/types/services"
import { createContext } from 'react';
import { formatPrice } from "@/lib/formatPrice"
import { deleteService } from "@/utils/actions/servicesActions"

export const ServiceContext = createContext<{ defaultValues: ServicesDefault, service_id: string } | null>(null)

interface ServiceCardProps {
  service: QueryService,
  index: number
}

const ServicesCard = ({ service, index }: ServiceCardProps) => {
  const { id, name, price, duration, description } = service
  const { hours, min } = getTimePartsFromSec(duration)
  return (
    <AccordionItem value={`item-${index}`} asChild className=" border rounded-md border-primary [&:not(:last-child)]:mb-4 ">
      <li>
        <AccordionTrigger className="px-4 hover:no-underline rounded-md  hover:[&:not([data-state='open'])]:bg-gray-100 transition-colors duration-150">
          <span className="title-h3 first-letter:uppercase ">{name}</span>
          <span className="text-primary text-sm ml-auto mr-8">
            {formatPrice(price, 'ru-RU', 'RUB')}
          </span>
        </AccordionTrigger>
        <AccordionContent >
          <div className=" justify-between w-[100%] flex  flex-col gap-4">
            <div className="flex flex-col gap-6 px-4">
              <p>{description}</p>
              <p className="text-xs self-end text-gray-500">Длительность услуги: {`${hours} ${getHHEndings(hours)} ${min} ${getMMEndings(min)}`}</p>
            </div>
            <div className="flex gap-1 justify-end  px-4">
              <ServiceContext.Provider value={{ defaultValues: { name, price, description, hours, minutes: min }, service_id: id }}>
                <ServicesDialog mode="edit" />
              </ServiceContext.Provider>
              <Button className="group" variant={'outline'} onClick={() => deleteService(id)}>
                <Trash className="group-hover:text-primary transition ease-in-out duration-150" />
              </Button>
            </div>
          </div>
        </AccordionContent>
      </li>

    </AccordionItem>
  )
}

export default ServicesCard;