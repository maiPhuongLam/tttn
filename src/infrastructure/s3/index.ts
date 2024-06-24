import { S3Client } from "@aws-sdk/client-s3";
import configuration from "src/config/configuration";

const s3Client = new S3Client({
  region: configuration.REGION,
  credentials: {
    accessKeyId: configuration.S3_ACCESS_KEY,
    secretAccessKey: configuration.S3_SECRET_KEY
  }
})
 
export default s3Client





