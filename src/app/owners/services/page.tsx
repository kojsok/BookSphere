import { addNewOwner } from "@/utils/actions/addDataToTableDB";
import { getAllOwnersWithBusinessName, getAllOwnersWithEmail, getOwnerByPhone, getOwners } from "@/utils/actions/fetchAllFromTableDB";
import { v4 as uuidv4 } from 'uuid';

export default async function Services() {

  // getOwners();
  // getAllOwnersWithEmail();
  // getOwnerByPhone("123 912");
  // getAllOwnersWithBusinessName();
  addNewOwner({ business_name: "примерчик", description: "мой примерчик", phone_number: "123456789", email: "123@123.ru"});

 

 
  
    return (
      <div className="w-full max-w-full flex flex-col justify-center items-center">
        <p className="text-2xl">This is an Services page</p>
      </div>
    );
  }
  