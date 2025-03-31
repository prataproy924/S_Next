import {z} from 'zod';


export const acceptMessageSchema = z.object({
  acceptMassages:z.boolean(),
  
});