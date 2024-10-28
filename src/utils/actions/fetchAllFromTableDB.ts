import { createClient } from "@/utils/supabase/server";
import { IOwner } from "../types/iowners";

const supabase = createClient();

// Универсальная функция для получения данных из таблицы Supabase
// Перегрузки позволяют использовать разные варианты вызова функции:
// - только tableName для получения всех данных таблицы,
// - tableName и field для фильтрации по полю без конкретного значения,
// - tableName, field и value для поиска конкретного значения в поле.
//!перегрузка функции для получения данных из таблицы Supabase
export async function fetchAllFromTableDB<T>(tableName: string): Promise<T[] | null>;
export async function fetchAllFromTableDB<T>(tableName: string, field: string): Promise<T[] | null>;
export async function fetchAllFromTableDB<T>(tableName: string, field: string, value: string | number): Promise<T[] | null>;
export async function fetchAllFromTableDB<T>(tableName: string, field?: string, value?: string | number): Promise<T[] | null> {
  try {
    let query = supabase.from(tableName).select('*');

    if (field && value !== undefined) {
      // Если указано поле и значение, выполняем точный поиск по этому полю и значению
      query = query.eq(field, value);
    } else if (field) {
      // Если указано только поле, получаем все записи, где поле не пустое и не null
      query = query.not(field, 'is', null).not(field, 'eq', '');
    }

    const { data, error } = await query;
    // if (error) throw error;
    if (error) {
      console.error(`Ошибка запроса данных либо данные отсутствуют в таблице ${tableName} базы данных:`, error);
      return null;
    }

    return data as T[];
  } catch (error) {
    console.error(`Ошибка запроса данных либо данные отсутствуют в таблице ${tableName}:`, error);
    return null;
  }
}

// Пример использования функции для получения всех владельцев бизнеса
export async function getOwners() {
  const owners = await fetchAllFromTableDB<IOwner>('owners');
  console.log('Owners:', owners);
  return owners;
}

// Пример использования функции с указанием поля без значения
export async function getAllOwnersWithEmail() {
  const owners = await fetchAllFromTableDB<IOwner>('owners', 'email');
  console.log('Owners with email:', owners);
  return owners;
}

// Пример использования функции с указанием поля и значения
export async function getOwnerByPhone(phone_number: string) {
  const owners = await fetchAllFromTableDB<IOwner>('owners', 'phone_number', phone_number);
  console.log('Owner by phone:', owners);
  return owners;
}

// Пример использования функции с указанием поля и значения
export async function getOwnerByBusinessName(business_name: string) {
  const owners = await fetchAllFromTableDB<IOwner>('owners', 'business_name', business_name);
  console.log('Owner by business_name:', owners);
  return owners;
}


// Пример использования функции с указанием поля без значения например все компании где есть поле bussiness_name
export async function getAllOwnersWithBusinessName() {
  const owners = await fetchAllFromTableDB<IOwner>('owners', 'business_name');
  console.log('Owners with business_name:', owners);
  return owners;
}




