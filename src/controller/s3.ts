import { AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_REGION } from '../config';
import fs from 'fs';
import aws from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload.d';
import { PutObjectRequest, GetObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3.d';

interface Ifile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimeType: string;
  description: string;
  filename: string;
  path: string;
  size: number;
}

const s3Instance = new aws.S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export async function awsResponse(arg: ManagedUpload | any): Promise<{ response?: any; error?: any }> {
  try {
    return { response: await arg.promise() };
  } catch (e) {
    return { error: e };
  }
}

export const awsImageResponse = async (arg: any) => {
  try {
    return { response: await arg };
  } catch (e) {
    return { error: e };
  }
};

export const uploadFile = (file: Ifile) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams: PutObjectRequest = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };
  return s3Instance.upload(uploadParams);
};

export const downloadFile = (fileKey: any) => {
  const downloadParams: GetObjectRequest = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME,
  };
  return s3Instance.getObject(downloadParams).createReadStream();
};

export const deleteFile = (fileKey: any) => {
  const deleteParams: DeleteObjectRequest = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME,
  };
  return s3Instance.deleteObject(deleteParams);
};
