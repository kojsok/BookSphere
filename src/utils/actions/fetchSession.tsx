import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchSession = async () => {
    const { data: sessionData, error } = await supabase.auth.getUser();

    if (error || !sessionData.user ) {
        console.error("Сессия не получена", error);
        return { error: "Сессия не получена" };
    }
    
    return { session: sessionData.user };

};