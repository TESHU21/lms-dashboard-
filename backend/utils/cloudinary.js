import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (path) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    resource_type: "auto",
  };
  return await cloudinary.uploader.upload(path, options);
};

export const uploadBufferToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          use_filename: true,
          unique_filename: true,
          overwrite: false,
          resource_type: "auto",
          public_id: filename,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
};

export const getOptimizedCloudinaryUrl = (publicId, { width } = {}) => {
  if (!publicId) return "";

  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        fetch_format: "auto",
        quality: "auto",
        ...(width ? { width, crop: "limit" } : {}),
      },
    ],
  });
};
