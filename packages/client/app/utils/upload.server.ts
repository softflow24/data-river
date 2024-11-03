import type { UploadHandler } from "@remix-run/node";
import { createServerClient } from "./supabase.server";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const BUCKET_NAME = "avatars";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
} as const;

async function compressImage(
  buffer: Buffer,
  contentType: string,
): Promise<Buffer> {
  try {
    const sharpInstance = sharp(buffer);

    // Resize if larger than 1024px in any dimension
    sharpInstance.resize(1024, 1024, {
      fit: "inside",
      withoutEnlargement: true,
    });

    // Compress based on image type
    if (contentType === "image/jpeg") {
      sharpInstance.jpeg({ quality: 80 });
    } else if (contentType === "image/png") {
      sharpInstance.png({ compressionLevel: 8 });
    } else if (contentType === "image/webp") {
      sharpInstance.webp({ quality: 80 });
    }

    return await sharpInstance.toBuffer();
  } catch (error) {
    console.warn("Image compression failed, using original:", error);
    return buffer;
  }
}

export const uploadHandler =
  (accessToken: string): UploadHandler =>
  async ({ name, contentType, data }) => {
    if (name !== "avatar") {
      return undefined;
    }

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    // Create an authenticated Supabase client
    const supabase = createServerClient(accessToken);

    // Validate content type
    if (!Object.keys(ALLOWED_TYPES).includes(contentType)) {
      throw new Error("Invalid file type. Only images are allowed.");
    }

    // Convert AsyncIterable to Buffer and check size
    const chunks = [];
    let size = 0;

    for await (const chunk of data) {
      chunks.push(chunk);
      size += chunk.length;

      if (size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 5MB limit.");
      }
    }

    const buffer = Buffer.concat(chunks);

    // Compress the image before upload
    const compressedBuffer = await compressImage(buffer, contentType);

    const fileName = `${uuidv4()}-${Date.now()}${ALLOWED_TYPES[contentType as keyof typeof ALLOWED_TYPES]}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, compressedBuffer, {
          contentType,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      // Cleanup using the authenticated client
      try {
        await supabase.storage.from(BUCKET_NAME).remove([fileName]);
      } catch (cleanupError) {
        console.error("Failed to clean up file after error:", cleanupError);
      }

      console.error("Upload error:", error);
      throw new Error("Failed to upload file");
    }
  };
