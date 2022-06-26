import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

/**
 * @external
 * Configures Cloudinary SDK.
 * Uses multer package to configure storage for image uploads.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "safe-space",
  },
});

const parser = multer({ storage: storage });

/**
 * @function
 * Processes the file path attached to the request by the parser middleware.
 * Renames and attaches to the request body for further processing in the controller.
 */
const avatarUpload = async (req, res, next) => {
  if (req.file) {
    const avatar = req.file.path;
    req.body.avatar = avatar;
  }
  next();
};

const imageUpload = async (req, res, next) => {
  if (req.file) {
    const image = req.file.path;
    req.body.image = image;
  }
  next();
};

export { avatarUpload, imageUpload, parser };
