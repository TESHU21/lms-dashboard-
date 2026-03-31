// Cloudinary utility for image uploads
import { getCLOUDINARY_CONFIG } from "@/config/cloudinary";

/**
 * Uploads an image file to Cloudinary and returns the secure URL
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file) => {
  if (!file || !(file instanceof File)) {
    throw new Error("Please provide a valid image file");
  }

  const config = getCLOUDINARY_CONFIG();

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPEG, JPG, PNG, or WEBP files are allowed");
  }

  // Validate file size
  if (file.size > config.maxFileSize) {
    throw new Error(
      `File must be less than ${config.maxFileSize / (1024 * 1024)}MB`,
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", config.uploadPreset);
  formData.append("cloud_name", config.cloudName);

  // Optional: add folder
  if (config.folder) {
    formData.append("folder", config.folder);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to upload image");
    }

    if (!data.secure_url) {
      throw new Error("No secure URL returned from Cloudinary");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Handles image upload for forms - accepts either File or string URL
 * @param {File|string} imageInput - Either a File object or a URL string
 * @returns {Promise<string>} - The image URL (uploaded or original)
 */
export const handleImageUpload = async (imageInput) => {
  // If it's already a string URL, return as-is
  if (typeof imageInput === "string") {
    return imageInput;
  }

  // If it's a File object, upload to Cloudinary
  if (imageInput instanceof File) {
    return await uploadImageToCloudinary(imageInput);
  }

  // If null/undefined, return empty string
  return "";
};
