// import {addOrUpdateOwner } from "@/utils/actions/addDataToTableDB";
// import { getAllOwnersWithBusinessName, getAllOwnersWithEmail, getOwnerByBusinessName, getOwnerByPhone, getOwners } from "@/utils/actions/fetchAllFromTableDB";

import { getOwners } from "@/utils/actions/fetchAllFromTableDB";


export default async function Services() {

 const owners = await getOwners();
  // getAllOwnersWithEmail();
  // getOwnerByPhone("123 912");
  // getAllOwnersWithBusinessName();
  // getOwnerByBusinessName("примерчик");
  // addOrUpdateOwner({id: "d768e530-d8ed-41dc-9c66-83fe9020dd3e", business_name: "примерчик", description: "мой примерчик", phone_number: "123456789"});
 

 
  
    return (
      <div className="w-full max-w-full flex flex-col justify-center items-center">
        <p className="text-2xl">This is an Services page</p>
        { owners?.map((owner) => <p key={owner.id}>{ owner.business_name }</p>) }
      </div>
    );
  }
  