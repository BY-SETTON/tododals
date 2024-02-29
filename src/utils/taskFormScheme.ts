import {z} from "zod";

export const taskFormSchema = z.object({
  name: z.string().min(1, {message: 'Name must be at least 1 characters'}).max(70, {message: 'Name must be less than 70 characters long'}),
  title: z.string().min(1, {message: 'Title must be at least 1 characters'}).max(70, {message: 'Title must be less than 70 characters long'}),
  description: z.string().min(1, {message: 'Description must be at least 1 characters'}).max(255, {message: 'Description must be less than 255 characters long'}),
});
