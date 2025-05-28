import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10, { message: "Mobile must be at least 10 digits" }),
  address: z.string().optional(),
  balance: z.coerce.number().min(0, { message: "Balance must be 0 or more" }),
  due: z.coerce.number().min(0, { message: "Due must be 0 or more" }),
  photo: z.any().optional()
});