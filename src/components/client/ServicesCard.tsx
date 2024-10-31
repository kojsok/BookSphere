'use client'

import { getTimePartsFromSec } from "@/lib/getTimePartsFromSec"
import { getHHEndings, getMMEndings } from "@/lib/getWordEnding"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import ServicesDialog from "./ServicesDialog"
import { QueryService, ServicesDefault } from "@/utils/types/services"
import { createContext } from 'react';

export const ServiceContext = createContext<{ defaultValues: ServicesDefault, service_id: string } | null>(null)

interface ServiceCardProps {
  service: QueryService,
  index: number
}

const ServicesCard = ({ service, index }: ServiceCardProps) => {
  const { id, name, price, duration, description } = service
  const { hours, min } = getTimePartsFromSec(duration)
  return (
    <AccordionItem value={`item-${index}`} asChild>
      <li>
        <AccordionTrigger>
          {name}
          <span>{price} RUB</span>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            <p>{description}</p>
            <p>Продолжительность услуги {`${hours} ${getHHEndings(hours)} ${min} ${getMMEndings(min)}`}</p>
            <div>
              <ServiceContext.Provider value={{ defaultValues: { name, price, description, hours, minutes: min }, service_id: id }}>
                <ServicesDialog mode="edit" />
              </ServiceContext.Provider>
              <Button>
                <Trash />
              </Button>
            </div>
          </div>
        </AccordionContent>
      </li>

    </AccordionItem>
  )
}

export default ServicesCard;