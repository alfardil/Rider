import { z } from "zod";

export const submitTransitUpdateSchema = z.object({
  id: z.number(),

  title: z
    .string()
    .trim()
    .min(1, { message: "Title should be atleast 1 character long." })
    .max(50, {
      message: "Title should not be longer than 50 chatacters long.",
    }),

  description: z.string().trim().min(15, {
    message: "Please write a description of 15 characters.",
  }),

  status: z.enum(["Open", "In Progress", "Resolved"]),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(date + "T00:00:00");
        return inputDate.getTime() >= today.getTime();
      },
      { message: "Date must be today or later." }
    ),

  lines: z.record(
    z.array(
      z.object({
        name: z.string().min(1, "Stop name cannot be empty"),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
  ),

  selectedLine: z.string().optional(),
  
  verified: z.boolean().default(false),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  selectedStop: z.string().nullable().optional(),
});