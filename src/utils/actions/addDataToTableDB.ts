import { createClient } from "@/utils/supabase/server";
import { IOwner } from "../types/iowners";

const supabase = createClient();

// Новый интерфейс, исключающий поле `email`
//export type IPartialOwner = Partial<IOwner>;  // делает все поля необязательными
// Новый интерфейс, где `email` - необязательное поле
export interface IPartialOwner extends Omit<IOwner, 'email'> {
  email?: string;
}

// Универсальная функция для добавления или обновления данных в таблице owners
export async function addOrUpdateOwner(data: IPartialOwner) {
  try {
    // Проверяем, существует ли пользователь с таким `id` в таблице `users`
    const { error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', data.id)
      .single();

    if (userError) {
      // throw new Error(`Пользователь с id ${data.id} не найден: ${userError.message}`);
      console.log(`Пользователь с id ${data.id} не найден: ${userError.message}`, userError.message);
    }

    // Проверяем, существует ли владелец бизнеса с таким `id` в таблице `owners`
    const { data: existingOwner, error: ownerError } = await supabase
      .from('owners')
      .select('*')
      .eq('id', data.id)
      .single();
    
    if (ownerError) {
      // throw new Error(`Пользователь с id ${data.id} не найден: ${ownerError.message}`);
      console.log(`Пользователь с id ${data.id} не найден: ${ownerError.message}`, ownerError.message);
    }

    if (existingOwner) {
      // Если владелец уже существует, обновляем только указанные поля
      console.log('Владелец существует и будет обновлен:', existingOwner);
      const { data: updatedOwner, error: updateError } = await supabase
        .from('owners')
        .update({
          business_name: data.business_name,
          description: data.description,
          phone_number: data.phone_number,
        })
        .eq('id', data.id);

      if (updateError) {
        // throw new Error(`Ошибка обновления владельца бизнеса: ${updateError.message}`);
        console.log(`Ошибка обновления владельца бизнеса: ${updateError.message}`, updateError.details);
      }

      return updatedOwner;
    } 
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`Не удалось добавить или обновить владельца бизнеса: ${error.message}`);
    } else {
      console.error(error);
      throw new Error(`Не удалось добавить или обновить владельца бизнеса: неизвестная ошибка`);
    }
  }
}