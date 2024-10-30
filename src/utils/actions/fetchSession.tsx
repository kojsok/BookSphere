import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchSession = async () => {
    const { data: sessionData, error } = await supabase.auth.getUser();

    if (error || !sessionData.user) {
        console.error("Сессия не получена", error);
        return { error: "Сессия не получена" };
    }
    // console.log(sessionData.user.id);

    // const { data: sessionUser } = await supabase.auth.getUser();
    // console.log(sessionUser)
    return { session: sessionData.user };

};




// import { createClient } from '@/utils/supabase/client';

// const supabase = createClient();

// export const fetchSession = async () => {
//     const { data: sessionData, error } = await supabase.auth.getSession();

//     if (error || !sessionData.session || !sessionData.session.user) {
//         console.error("Сессия не получена", error);
//         return { error: "Сессия не получена" };
//     }
//     // console.log(sessionData.session);

//     // const { data: sessionUser } = await supabase.auth.getUser();
//     // console.log(sessionUser)
//     return { session: sessionData.session };

// };



// import { createClient } from '@/utils/supabase/client';
// const supabase = createClient();

// export const fetchSession = async () => {
//     const { data: sessionData } = await supabase.auth.getSession();

//     if (!sessionData.session || !sessionData.session.user) {
//         console.error("Необходимо авторизоваться");
//         return;
//     }
//     // console.log(sessionData);
//     // return sessionData.session.user.id;
//     return sessionData.session
// };