import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@data-river/shared/ui/components/ui/avatar";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import type { Database } from "~/types/supabase";
import { useFetcher } from "@remix-run/react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@data-river/shared/ui/components/ui/tooltip";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { AvatarCropDialog } from "./avatar-crop-dialog";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfilePictureProps {
  profile: Profile;
}

export function ProfilePicture({ profile }: ProfilePictureProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fetcher = useFetcher();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Create URL for the image and open crop dialog
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setCropDialogOpen(true);
  };

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", croppedImageBlob);

      fetcher.submit(formData, {
        method: "POST",
        action: "/settings/profile/avatar",
        encType: "multipart/form-data",
      });
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
        setSelectedImage(null);
      }
    }
  };

  const handleRemoveAvatar = () => {
    fetcher.submit(
      { _action: "remove" },
      {
        method: "POST",
        action: "/settings/profile/avatar",
      },
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative group">
              <label
                className="relative cursor-pointer block"
                htmlFor="avatar-upload"
              >
                <Avatar className="h-40 w-40">
                  <AvatarImage src={profile.avatar_url ?? undefined} />
                  <AvatarFallback className="text-4xl">
                    {profile.display_name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                {/* Overlay with pencil icon - hidden on mobile */}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center hidden md:flex">
                  <Pencil className="h-8 w-8 text-white" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                )}
              </label>

              {/* Remove button - desktop version */}
              {profile.avatar_url && (
                <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleRemoveAvatar}
                          disabled={isUploading}
                          className="rounded-full h-10 w-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove picture</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            {/* Mobile buttons */}
            <div className="flex flex-col gap-2 w-full mt-4 md:hidden">
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
                disabled={isUploading}
              >
                Upload New Picture
              </Button>
              {profile.avatar_url && (
                <Button
                  variant="outline"
                  onClick={handleRemoveAvatar}
                  disabled={isUploading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Picture
                </Button>
              )}
            </div>

            {/* Desktop helper text */}
            <p className="text-sm text-muted-foreground mt-4 hidden md:block">
              Click the avatar to upload a new picture
            </p>
          </div>
        </CardContent>
      </Card>

      {selectedImage && (
        <AvatarCropDialog
          isOpen={cropDialogOpen}
          onClose={() => {
            setCropDialogOpen(false);
            URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
          }}
          imageUrl={selectedImage}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}
