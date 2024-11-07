import { createClient } from "./supabase.server";

export async function deleteStorageFile(
  request: Request,
  path: string | null,
  bucket: string,
) {
  if (!path) return;

  try {
    const { supabase } = await createClient(request);
    const { error } = await supabase.storage
      .from(bucket)
      .remove([getFileNameFromUrl(path)]);

    if (error) {
      console.error("Failed to delete file:", error);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// Helper to extract filename from Supabase URL
function getFileNameFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}
