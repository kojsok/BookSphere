import ServicesDialog from "@/components/client/ServicesDialog";
import ServicesList from "@/components/server/ServicesList";


export default async function Services() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="title-h1 mb-8">Услуги</h1>
      <ServicesList className="mb-8" />
      <ServicesDialog
        styling={{
          trigger: 'mx-auto block'
        }}
      />

    </div>
  );
}
