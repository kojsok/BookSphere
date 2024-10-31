import { z } from "zod";

export const servicesFormSchema = z.object({
  name: z.string().min(3, { message: "Минимум 3 символа" }),
  price: z.number(),
  hours: z.number(),
  minutes: z.number(),
  description: z.string(),
  service_id: z.string().optional(),
});

export type ServicesDefault = z.infer<typeof servicesFormSchema>;

export interface MutationService {
  owner_id: string;
  name: string;
  price: number;
  duration: number; //sec
  description: string;
}

export interface QueryService extends MutationService {
  id: string;
}
