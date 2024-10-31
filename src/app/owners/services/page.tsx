import ServicesDialog from "@/components/client/ServicesDialog";
import ServicesList from "@/components/server/ServicesList";


export default async function Services() {
  return (
    <div className="w-full max-w-full flex flex-col justify-center items-center">
      <h1>Услуги</h1>
      <ServicesList />
      <ServicesDialog />

    </div>
  );
}
