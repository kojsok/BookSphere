import { QueryService } from "@/utils/types/services";
import { readAllUserServices } from "@/utils/actions/servicesActions";
import { Accordion } from "../ui/accordion";
import ServicesCard from "../client/ServicesCard";


const ServicesList = async () => {
  const { data: services, error } = await readAllUserServices();

  if (error) {
    return <p>{error}</p>
  }
  return (
    <Accordion type="single" collapsible asChild>
      <ul>
        {services?.map((service: QueryService, i: number) =>
          <ServicesCard key={service.id} service={service} index={i} />
        )}
      </ul>
    </Accordion>
  );

}

export default ServicesList;