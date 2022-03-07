import multer from 'multer';
import fs from 'fs';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const s3 = new aws.S3({
  region: 'ap-southeast-1',
  accessKeyId: 'AKIAWZYISU5UAMKFHION',
  secretAccessKey: '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',
});

const dir = './public';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(file);
    cb(undefined, Date.now() + '-' + file.originalname);
  },
});

const fileStorageEngineS3 = multerS3({
  s3: s3,
  bucket: 'projectbram',
  metadata: (req: any, file: any, cb: any) => {
    cb(undefined, { fieldName: file.fieldname });
  },
  key: (req: any, file: any, cb: any) => {
    cb(undefined, Date.now().toString());
  },
});
export const upload = multer({ storage: fileStorageEngine });
export const uploads3 = multer({ storage: fileStorageEngineS3 });
