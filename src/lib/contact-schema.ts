import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Tell me your name (min 2 characters)").max(80),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject is too short").max(120),
  message: z.string().min(10, "Message should be at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
