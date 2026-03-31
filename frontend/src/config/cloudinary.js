// Cloudinary Configuration
// Replace these values with your actual Cloudinary credentials

export const CLOUDINARY_CONFIG = {
  cloudName: "your_cloud_name", // Your Cloudinary cloud name
  uploadPreset: "your_upload_preset", // Your unsigned upload preset
  apiKey: "your_api_key", // Optional: for signed uploads
  apiSecret: "your_api_secret", // Optional: for signed uploads
  
  // Upload settings
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  folder: "lms-dashboard", // Optional: folder name in Cloudinary
};

// Environment variables fallback
export const getCLOUDINARY_CONFIG = () => {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || CLOUDINARY_CONFIG.cloudName,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || CLOUDINARY_CONFIG.uploadPreset,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || CLOUDINARY_CONFIG.apiKey,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || CLOUDINARY_CONFIG.apiSecret,
    maxFileSize: CLOUDINARY_CONFIG.maxFileSize,
    allowedFormats: CLOUDINARY_CONFIG.allowedFormats,
    folder: CLOUDINARY_CONFIG.folder,
  };
};
