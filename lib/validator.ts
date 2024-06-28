import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long").max(400, "Description must be at most 400 characters long"),
  location: z.string().min(3, "Location must be at least 3 characters long").max(400, "Location must be at most 400 characters long"),
  imageUrl: z.string().url("Invalid URL format"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().min(1, "Category is required"),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url("Invalid URL format"),
}).refine(data => data.endDateTime >= data.startDateTime, {
  message: "End date cannot be before start date",
  path: ["endDateTime"],
});
