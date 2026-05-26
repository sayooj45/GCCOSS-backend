import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION,

  endpoint: process.env.DO_SPACES_ENDPOINT,

  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const upload = multer({
  storage: multerS3({
    s3,

    bucket: process.env.DO_SPACES_BUCKET,

    acl: "public-read",

    contentType: multerS3.AUTO_CONTENT_TYPE,

    contentDisposition: (req, file, cb) => {
      // OPEN PDF IN BROWSER
      if (file.fieldname === "pdf") {
        cb(null, "inline");
      } else {
        cb(null, null);
      }
    },

    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },

    key: (req, file, cb) => {
      let folder = "uploads";

      // PARTNER LOGO
      if (file.fieldname === "logo") {
        folder = "partners";
      }

      // EVENT IMAGE
      else if (file.fieldname === "image") {
        folder = "events";
      }

      // PUBLICATION PDF
      else if (file.fieldname === "pdf") {
        folder = "publications/pdf";
      }

      // PUBLICATION IMAGE
      else if (file.fieldname === "publicationImage") {
        folder = "publications/images";
      }

      cb(null, `${folder}/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
