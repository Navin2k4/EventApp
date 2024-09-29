import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long").max(400, "Description must be at most 400 characters long"),
  location: z.string().min(3, "Location must be at least 3 characters long").max(400, "Location must be at most 400 characters long"),
  mapLocation: z.string().optional(), // New optional field for map location
  imageUrl: z.string().url("Invalid URL format"),
  registrationEndDate: z.date().optional(), // New optional field for registration end date
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().min(1, "Category is required"),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url("Invalid URL format").optional(), // Make URL optional
  eventCapacity: z.number().optional(), // New optional field for event capacity
  coordinators: z.array(z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  })).optional(), // Optional array of coordinators
}).refine(data => data.endDateTime >= data.startDateTime, {
  message: "End date cannot be before start date",
  path: ["endDateTime"],
}).refine(data => {
  if (data.registrationEndDate) {
    return data.registrationEndDate.getTime() <= data.startDateTime.getTime();
  }
  return true;
}, {
  message: "Registration end date cannot be before the start date",
  path: ["registrationEndDate"],
});
