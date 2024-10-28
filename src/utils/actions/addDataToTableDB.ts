import { createClient } from "@/utils/supabase/server";
import { IOwner } from "../types/iowners";

const supabase = createClient();


// Универсальная функция для добавления данных в таблицу Supabase
// Перегрузки позволяют использовать разные варианты вызова функции:
// - только tableName и data для добавления данных,
// - tableName, data и callback для выполнения дополнительного действия после добавления.
export async function addDataToTableDB<T>(tableName: string, data: T): Promise<T | null>;
export async function addDataToTableDB<T>(tableName: string, data: T, callback: (result: T | null) => void): Promise<T | null>;
export async function addDataToTableDB<T>(tableName: string, data: T, callback?: (result: T | null) => void): Promise<T | null> {
  try {
    const { data: result, error } = await supabase.from(tableName).insert(data).single();

    if (error) {
      console.error("Ошибка добавления данных в таблицу базы данных:", error);
      return null;
    }

    // Вызов callback, если он указан
    if (callback) {
      callback(result as T);
    }

    return result as T;
  } catch (error) {
    console.error("Ошибка добавления данных в базу данных:", error);
    return null;
  }
}

// Примеры использования функции для добавления данных в таблицу

// Добавление нового владельца бизнеса
export async function addNewOwner(owner: IOwner) {
  const result = await addDataToTableDB<IOwner>('owners', owner);
  console.log('Новый владелец добавлен:', result);
  return result;
}

// Добавление нового владельца бизнеса с callback
export async function addNewOwnerWithCallback(owner: IOwner) {
  await addDataToTableDB<IOwner>('owners', owner, (result) => {
    if (result) {
      console.log('Владелец успешно добавлен с callback:', result);
    } else {
      console.log('Ошибка при добавлении владельца.');
    }
  });
}


//export const tramparm = addDataToTableDB<IOwner>('owners', {id: 1, business_name: 'примерчик', description: 'мой примерчик', phone_number: '123456789', email: '123@123.ru'});