import { Form as RemixForm, useActionData } from "@remix-run/react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Input } from "@data-river/shared/ui/components/ui/input";
import { Textarea } from "@data-river/shared/ui/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Database } from "~/types/supabase";
import { profileSchema, type ProfileFormData } from "~/schemas/profile";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@data-river/shared/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@data-river/shared/ui/components/ui/select";
import { useEffect } from "react";
import { toast } from "sonner";

const TIMEZONE_GROUPS = {
  "North America": [
    { value: "America/New_York", label: "Eastern Standard Time (EST)" },
    { value: "America/Chicago", label: "Central Standard Time (CST)" },
    { value: "America/Denver", label: "Mountain Standard Time (MST)" },
    { value: "America/Los_Angeles", label: "Pacific Standard Time (PST)" },
    { value: "America/Anchorage", label: "Alaska Standard Time (AKST)" },
    { value: "Pacific/Honolulu", label: "Hawaii Standard Time (HST)" },
  ],
  "Europe & Africa": [
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Europe/Helsinki", label: "Eastern European Time (EET)" },
    { value: "Europe/Lisbon", label: "Western European Time (WET)" },
    { value: "Africa/Cairo", label: "Central Africa Time (CAT)" },
    { value: "Africa/Nairobi", label: "East Africa Time (EAT)" },
  ],
  Asia: [
    { value: "Europe/Moscow", label: "Moscow Time (MSK)" },
    { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Seoul", label: "Korea Standard Time (KST)" },
    { value: "Asia/Jakarta", label: "Indonesia Time (WIB)" },
  ],
  "Australia & Pacific": [
    {
      value: "Australia/Perth",
      label: "Australian Western Standard Time (AWST)",
    },
    {
      value: "Australia/Darwin",
      label: "Australian Central Standard Time (ACST)",
    },
    {
      value: "Australia/Sydney",
      label: "Australian Eastern Standard Time (AEST)",
    },
    { value: "Pacific/Auckland", label: "New Zealand Standard Time (NZST)" },
    { value: "Pacific/Fiji", label: "Fiji Time (FJT)" },
  ],
  "South America": [
    { value: "America/Argentina/Buenos_Aires", label: "Argentina Time (ART)" },
    { value: "America/La_Paz", label: "Bolivia Time (BOT)" },
    { value: "America/Sao_Paulo", label: "Brasilia Time (BRT)" },
    { value: "America/Santiago", label: "Chile Standard Time (CLT)" },
  ],
};

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileFormProps {
  profile: Profile;
  actionData?: {
    errors?: Record<string, string[]>;
    values?: Record<string, unknown>;
  };
  action: string;
}

export function ProfileForm({ profile, actionData, action }: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: profile.display_name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      website: profile.website || "",
      company: profile.company || "",
      city: profile.city || "",
      country: profile.country || "",
      timezone: profile.timezone || "",
    },
  });

  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  useEffect(() => {
    if (actionData) {
      if (actionData.errors) {
        Object.keys(actionData.errors).forEach((key) => {
          form.setError(key as keyof ProfileFormData, {
            type: "server",
            message: actionData.errors[key]?.join(", "),
          });
        });
        toast.error("Failed to update profile");
      } else {
        form.clearErrors();
        toast.success("Profile updated successfully");
        form.reset(form.getValues());
      }
    }
  }, [actionData, form]);

  const onSubmit = (e: React.FormEvent) => {
    if (!isDirty) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Form {...form}>
      <RemixForm
        method="post"
        className="space-y-6"
        action={action}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>
                Your name as it appears across the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  readOnly
                  className="bg-muted"
                />
              </FormControl>
              <FormDescription>
                Your username cannot be changed after registration.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  className="h-32"
                />
              </FormControl>
              <FormDescription>
                Tell us a little bit about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com"
                  type="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <div>
                  <input
                    type="hidden"
                    name="timezone"
                    value={field.value || ""}
                  />
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                    defaultValue={field.value || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TIMEZONE_GROUPS).map(
                        ([group, timezones]) => (
                          <SelectGroup key={group}>
                            <SelectLabel>{group}</SelectLabel>
                            {timezones.map(({ value, label }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormDescription>
                Your local timezone for accurate time display
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {actionData?.errors?.form && (
          <p className="text-destructive text-sm">
            {actionData.errors.form.join(", ")}
          </p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !isDirty}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </RemixForm>
    </Form>
  );
}
