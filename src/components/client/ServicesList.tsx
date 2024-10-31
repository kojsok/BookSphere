'use client'
import { QueryService, ServicesDefault } from "@/utils/types/services";
import { readAllUserServices } from "@/utils/actions/servicesActions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { getHHEndings, getMMEndings } from "@/lib/getWordEnding";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import ServicesDialog from "./ServicesDialog";
import { getTimePartsFromSec } from "@/lib/getTimePartsFromSec";
import { createContext, useEffect, useState } from 'react';


export const ServiceContext = createContext<{ defaultValues: ServicesDefault, service_id: string } | null>(null)

const ServicesList = () => {
  const [services, setServices] = useState<QueryService[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await readAllUserServices();
      setServices(data);
      setError(error);
    };

    fetchServices();
  }, [])

  if (error) {
    return <p>{error}</p>
  }
  return (
    <Accordion type="single" collapsible asChild>
      <ul>
        {services?.map((service: QueryService, i: number) => {
          const { id, name, price, duration, description } = service
          const { hours, min } = getTimePartsFromSec(duration)
          return (
            <AccordionItem key={service.id} value={`item-${i}`} asChild>
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
        })}
      </ul>
    </Accordion>
  );

}

export default ServicesList;