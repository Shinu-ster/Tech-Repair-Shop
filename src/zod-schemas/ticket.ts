import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

export const insertTicketSchema = z.object({
  id: z.union([z.number(), z.literal("(New)")]),
  customerId: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: z.string().email("Invalid email address"),
  completed: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const selectTicketSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  tech: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type selectTicketSchemaType = z.infer<typeof selectTicketSchema>;

export type insertTicketSchemaType = z.infer<typeof insertTicketSchema>;
