import { QueryService } from "@/utils/types/services";
import { readAllUserServices } from "@/utils/actions/servicesActions";
import { Accordion } from "../ui/accordion";
import ServicesCard from "../client/ServicesCard";
import { cn } from "@/lib/utils";
import { ROWS_PER_PAGE } from "@/utils/constants/services";
import Paginate from "./Paginate";

interface ServicesListProps {
  className?: string
  currentPage?: number | null
}

const ServicesList = async ({ className = '', currentPage = null }: ServicesListProps) => {
  //получаем список услуг 
  const { count, data: services, error } = await readAllUserServices({ page: currentPage, pageOffset: ROWS_PER_PAGE - 1 })

  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <Accordion type="single" collapsible asChild className={
        cn(
          '',
          className
        )
      }>
        <ul>
          {services?.map((service: QueryService, i: number) =>
            <ServicesCard key={service.id} service={service} index={i} />
          )}
        </ul>
      </Accordion>
      {typeof currentPage === "number" && !isNaN(currentPage) && <Paginate currentPage={currentPage} totalRows={count} rowsPerPage={ROWS_PER_PAGE} /> || null}
    </>
  );

}

export default ServicesList;