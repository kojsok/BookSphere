import ServicesDialog from "@/components/client/ServicesDialog";
import ServicesList from "@/components/server/ServicesList";
import { PageProps } from "@/utils/types/pageTypes";


export default async function Services({ searchParams }: PageProps) {
  const current = searchParams.page ? Number(searchParams.page) : 0
  return (
    <div className="w-full md:max-w-xl mx-auto px-6 py-10">
      <h1 className="title-h1 mb-8">Услуги</h1>
      <ServicesList className="mb-8" currentPage={current} />
      <ServicesDialog
        styling={{
          trigger: 'mx-auto block mt-8'
        }}
      />

    </div>
  );
}
