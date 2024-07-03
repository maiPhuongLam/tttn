import { DeleteObjectCommand, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import configuration from 'src/config/configuration';
import s3Client from 'src/infrastructure/s3';

export const getObjectUrl = async (key: string) => {
  const params = {
    Bucket: configuration.BUCKET_NAME,
    Key: key,
  };

  const url = await getSignedUrl(s3Client, new PutObjectCommand(params));
  return url;
};

export const putObjectUrl = async (file: Express.Multer.File, contentType: string): Promise<any> => {
  const params = new PutObjectCommand({
    Bucket: configuration.BUCKET_NAME,
    Key: '/productfiles/' + file.originalname,
    ContentType: "image/jpeg",
    Body: file.buffer
  });

  const result = await s3Client.send(params)
  const signedUrl = new GetObjectCommand({ Bucket: configuration.BUCKET_NAME, Key: '/productfiles/' + file.originalname,})
  const url = await getSignedUrl(s3Client, signedUrl, { expiresIn: 3600 });
    console.log(url);
  return url;
};

export const deleteObject = async (key: string) => {
  const params = {
    Bucket: configuration.BUCKET_NAME,
    Key: key,
  };

  await s3Client.send(new DeleteObjectCommand(params));
};

export const setProfilePic = () => {
  multer({});
};
