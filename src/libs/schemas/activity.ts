import * as z from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  city: z.string().min(1, { message: "City is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
});

export type ActivityFormValues = z.infer<typeof activitySchema>;
