import { z } from "zod";

export const insertCustomerSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, "First Name required"),
  lastName: z.string().min(1, "Last Name required"),
  address1: z.string().min(1, "Address Required"),
  address2: z.string().nullable(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be exactly 2 characters"),
  email: z.string().email("Invalid Email"),
  zip: z
    .string()
    .regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  phone: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
  notes: z.string().nullable(),
  active: z.boolean(),
});

// export const selectCustomerSchema = createSelectSchema(customers);

export const selectCustomerSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, "First Name required"),
  lastName: z.string().min(1, "Last Name required"),
  address1: z.string().min(1, "Address Required"),
  address2: z.string().nullable(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be exactly 2 characters"),
  email: z.string().email("Invalid Email"),
  zip: z
    .string()
    .regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
    ),
  phone: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
  notes: z.string().nullable().default(""),
  active: z.boolean().default(true),
});

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;

export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
