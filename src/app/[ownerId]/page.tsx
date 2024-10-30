import { getOwnerData } from "@/utils/actions/getOwnerData";
import { notFound } from 'next/navigation';

const OwnerPage = async ({ params }: { params: { ownerId: string } }) => {
  const ownerData = await getOwnerData(params.ownerId);

  if (!ownerData) {
    notFound(); // Перенаправит на страницу 404, если данные не найдены
  }

  return (
 
    <div className="flex  justify-center p-4">
    <div className="container max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center  mb-4">
        Бизнес: {ownerData.business_name}
      </h1>
      <p className=" text-center mb-2">
        Описание: {ownerData.description}
      </p>
      <p className="text-center">
        Телефон: {ownerData.phone_number}
      </p>
    </div>
  </div>
  );
};

export default OwnerPage;

