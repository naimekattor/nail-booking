"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/apiClient";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  onClose: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ProfileInfoModal = ({ onClose }: ModalProps) => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    profile_image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Generate preview when file changes
  useEffect(() => {
    if (formData.profile_image) {
      const url = URL.createObjectURL(formData.profile_image);
      setPreviewUrl(url);

      // Cleanup
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [formData.profile_image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setError("File too large. Maximum 10 MB allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError(null);
    setFormData((prev) => ({ ...prev, profile_image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      setError("Name is required");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      let newProfileImageUrl = user?.profile_image_url;

      // Step 1: Upload image if selected
      if (formData.profile_image) {
        const fileSize = formData.profile_image.size;

        const presignRes = await apiClient<{
          // profile_image_url: string;
          // token: string;
        }>("accounts/reqeust-update-profile/", {
          method: "POST",
          body: JSON.stringify({ profile_image_size: fileSize }),
          auth: true,
        });
        const imageUrl=presignRes.profile_image_url;
        const token=presignRes.token;
        

        // Step 2: PUT image to S3
        await fetch(imageUrl, {
          method: "PUT",
          
          body: formData.profile_image,
          headers: {
            "Content-Type": formData.profile_image.type,
          },
        });

        // Step 3: Finalize update
        const finalizeRes = await apiClient<{
          // profile_image_url?: string;
        }>("accounts/update-profile/", {
          method: "POST",
          body: JSON.stringify({
            token,
            full_name: formData.full_name,
          }),
          auth: true,
        });

        newProfileImageUrl = finalizeRes.profile_image_url ;
      } 
      // else {
      //   // Only update name
      //   await apiClient("accounts/update-profile/", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       full_name: formData.full_name,
      //     }),
      //     auth: true,
      //   });
      // }

      // Step 4: Update Zustand store
      setUser({
        ...user!,
        full_name: formData.full_name,
        profile_image_url: newProfileImageUrl,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error("Profile update failed:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 p-4 pt-20 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
        <h3 className="font-bold text-lg text-gray-800">Update Profile</h3>
        <p className="text-sm text-gray-500 mt-1">
          Max file size: 10 MB. Supported: JPG, PNG, GIF.
        </p>

        {/* Success */}
        {success && (
          <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            Profile updated successfully!
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Administrator Name</label>
            <input
              type="text"
              value={formData.full_name || "No Name Set"}
              onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
              disabled={uploading}
            />
          </div>

          {/* Image Upload + Preview */}
          <div>
            <label className="text-sm font-medium text-gray-700">Admin Picture</label>

            {/* Current / Preview */}
            {(previewUrl || user?.profile_image_url) && (
              <div className="mt-2 flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={previewUrl || user!.profile_image_url!}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 disabled:opacity-50"
            />

            {/* File Info */}
            {formData.profile_image && (
              <p className="mt-2 text-xs text-gray-500">
                Selected: <strong>{formData.profile_image.name}</strong> (
                {(formData.profile_image.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.full_name.trim()}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:opacity-90 disabled:opacity-50 transition flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                  Uploading...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfoModal;