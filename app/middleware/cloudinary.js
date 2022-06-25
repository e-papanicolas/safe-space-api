import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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

const avatarUpload = async (req, res, next) => {
  const avatar = req.file.path;
  req.body.avatar = avatar;
  next();
};

const imageUpload = async (req, res, next) => {
  const image = req.file.path;
  req.body.image = image;
  next();
};

export { avatarUpload, imageUpload, parser };
