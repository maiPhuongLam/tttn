import multer, { Multer } from "multer";
import multerS3 from 'multer-s3'
import configuration from "src/config/configuration";
import s3Client from 'src/infrastructure/s3'

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: configuration.BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});