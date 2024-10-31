import { z } from "zod";

export const profileSchema = z.object({
  display_name: z.string().min(2).max(50).nullable(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    )
    .nullable(),
  bio: z.string().max(500).nullable(),
  avatar_url: z.string().url().nullable(),
  website: z.string().url().nullable(),
  company: z.string().max(100).nullable(),
  location: z.string().max(100).nullable(),
  city: z.string().max(100).nullable(),
  country: z.string().max(100).nullable(),
  timezone: z.string().nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
