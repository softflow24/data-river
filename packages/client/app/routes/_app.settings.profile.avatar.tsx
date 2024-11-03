import {
  ActionFunctionArgs,
  json,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import { uploadHandler } from "~/utils/upload.server";
import { deleteStorageFile } from "~/utils/storage.server";

const AVATARS_BUCKET = "avatars";

async function handleAvatarUpload(
  request: Request,
  userId: string,
  accessToken: string,
  oldAvatarUrl: string | null,
) {
  let newAvatarUrl: string | null = null;

  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler(accessToken),
    );

    newAvatarUrl = formData.get("avatar") as string;

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: newAvatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      throw new Error("Failed to update profile");
    }

    // Delete old avatar if it exists
    await deleteStorageFile(oldAvatarUrl, accessToken, AVATARS_BUCKET);

    return json({ success: true });
  } catch (error) {
    // If we failed after uploading the new avatar, clean it up
    if (newAvatarUrl) {
      await deleteStorageFile(newAvatarUrl, accessToken, AVATARS_BUCKET);
    }

    return json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to upload image",
      },
      { status: 500 },
    );
  }
}

async function handleAvatarRemoval(
  userId: string,
  oldAvatarUrl: string | null,
  accessToken: string,
) {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      throw new Error("Failed to remove avatar");
    }

    // Delete the old avatar file
    await deleteStorageFile(oldAvatarUrl, accessToken, AVATARS_BUCKET);

    return json({ success: true });
  } catch (error) {
    return json(
      { success: false, error: "Failed to remove avatar" },
      { status: 500 },
    );
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  const accessToken = session.get("access_token");

  if (!accessToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userId = session.get("user_id") as string;

  // Fetch current profile to get the old avatar URL
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profileError) {
    return json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 },
    );
  }

  const oldAvatarUrl = profile?.avatar_url;

  // Handle avatar removal
  if (
    request.method === "POST" &&
    !request.headers.get("Content-Type")?.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    if (formData.get("_action") === "remove") {
      return handleAvatarRemoval(userId, oldAvatarUrl, accessToken);
    }
  }

  // Handle avatar upload
  return handleAvatarUpload(request, userId, accessToken, oldAvatarUrl);
}
