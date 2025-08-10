import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

const baseTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  description: true,
});

export const insertTicketSchema = baseTicketSchema.extend({
  id: z.union([z.number(), z.literal("(New)")]),
  title: baseTicketSchema.shape.title.min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: baseTicketSchema.shape.tech.refine(
    (val) => typeof val === "string" && val.includes("@"),
    {
      message: "Invalid email address",
    }
  ),
});

export const selectTicketSchema = createSelectSchema(tickets);

type AnyZodObject = z.ZodTypeAny;


export type insertTicketSchemaType = z.infer<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ReturnType<typeof insertTicketSchema.parse> extends infer _
    ? AnyZodObject
    : never
>;


export type selectTicketSchemaType = z.infer<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ReturnType<typeof selectTicketSchema.parse> extends infer _
    ? AnyZodObject
    : never
>; 
