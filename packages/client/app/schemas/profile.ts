import { z } from "zod";

const timezones = Intl.supportedValuesOf("timeZone");

export const profileSchema = z.object({
  display_name: z.string().min(2).max(50),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    ),
  bio: z
    .string()
    .max(500)
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  avatar_url: z
    .string()
    .url()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  website: z
    .string()
    .url()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  company: z
    .string()
    .max(100)
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  city: z
    .string()
    .max(100)
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  country: z
    .string()
    .max(100)
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  timezone: z
    .string()
    .refine((val) => !val || timezones.includes(val), {
      message: "Please select a valid timezone",
    })
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
