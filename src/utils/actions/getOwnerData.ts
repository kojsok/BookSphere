import { supabase } from "../supabase/mySupabaseClient";
import { IOwner } from "../types/iowners";

export const getOwnerData = async (ownerId: string): Promise<Omit<IOwner, "email"> | null> => {
    const { data, error } = await supabase
      .from('owners')
      .select('id, business_name, description, phone_number')
      .eq('id', ownerId)
      .single();
  
    if (error || !data) {
      console.error("Ошибка загрузки данных владельца:", error?.message);
      return null;
    }
    return data;
  };
  