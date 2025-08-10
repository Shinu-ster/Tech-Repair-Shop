import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";
const baseCustomerSchema = createInsertSchema(customers);

export const insertCustomerSchema = baseCustomerSchema.extend({
  firstName: baseCustomerSchema.shape.firstName.min(
    1,
    "First name is required"
  ),
  lastName: baseCustomerSchema.shape.lastName.min(1, "Last name is required"),
  address1: baseCustomerSchema.shape.address1.min(1, "Address is required"),
  city: baseCustomerSchema.shape.city.min(1, "City is required"),
  state: baseCustomerSchema.shape.state.length(
    2,
    "State must be exactly 2 characters"
  ),
  email: baseCustomerSchema.shape.email.email("Invalid email address"),
  zip: baseCustomerSchema.shape.zip.regex(
    /^\d{5}(-\d{4})?$/,
    "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"
  ),
  phone: baseCustomerSchema.shape.phone.regex(
    /^\d{3}-\d{3}-\d{4}$/,
    "Invalid phone number format. Use XXX-XXX-XXXX"
  ),
});

export const selectCustomerSchema = createSelectSchema(customers);
type AnyZodObject = z.ZodTypeAny;

// Narrow with ReturnType so TS doesn't try to expand the full thing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type insertCustomerSchemaType = z.infer<ReturnType<typeof insertCustomerSchema.parse> extends infer _ ? AnyZodObject : never>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type selectCustomerSchemaType = z.infer<ReturnType<typeof selectCustomerSchema.parse> extends infer _ ? AnyZodObject : never>;
