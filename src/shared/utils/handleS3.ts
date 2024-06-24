import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import multer from "multer"
import configuration from "src/config/configuration"
import s3Client from "src/infrastructure/s3"

export const getObjectUrl = async (key: string) => {
  const params = {
    Bucket: configuration.BUCKET_NAME,
    Key: key
  }

  const url = await getSignedUrl(s3Client, new PutObjectCommand(params))
  return url
}

export const putObjectUrl = async (filename: string, contentType: string): Promise<string> => {
  const params = {
    Bucket: configuration.BUCKET_NAME,
    Key: '/productfiles/' + filename,
    ContentType: contentType
  }

  const url = await getSignedUrl(s3Client, new PutObjectCommand(params))
  return url
}

export const deleteObject = async (key: string) => {
  const params = {
    Bucket: configuration.BUCKET_NAME,
    Key: key
  };

  await s3Client.send(new DeleteObjectCommand(params));
};

export const setProfilePic = () => {
  multer({})
}