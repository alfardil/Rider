import { z } from "zod";

export const submitIncidentSchema = z.object({
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
  // Probably just use native DateTime in the future.
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const inputDate = new Date(date + "T00:00:00"); // Force midnight
        return inputDate.getTime() >= today.getTime();
      },
      { message: "Date must be today or later." }
    ),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  verified: z.boolean().default(false),
});
