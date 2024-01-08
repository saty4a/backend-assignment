import multer from "multer";
import path from "path";

const storagePictures = multer.diskStorage({
    destination: "./upload/Images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
});

export const errHandler = (error, request, response, next) => {
    if (error instanceof multer.MulterError) {
      response.json({
        data: null,
        message: "File size is more than 10 MB.",
        staus: 400,
        success: false,
      });
    }
};

export const uploadImages = multer({
    storage: storagePictures,
    limits: { fileSize: 10000000 }, //10MB in bytes
});