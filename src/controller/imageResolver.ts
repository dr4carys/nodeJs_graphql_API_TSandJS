import { uploadFile, awsResponse, downloadFile, awsImageResponse, deleteFile } from './s3';
import { result } from '../utils/resultHandling';
import { Book } from '../models/book';

export const createBookResolver = async (req: any, res: any) => {
  const imagePath: any = [];
  for (let i = 0; i < req.files.length; i++) {
    const { response, error } = await awsResponse(uploadFile(req.files[i]));
    if (error) {
      if (i === 0) res.send(result(400, 'error upload image'));
      const { response } = await awsResponse(deleteFile(imagePath[0].Key));
      if (response) res.send(result(400, 'error upload image'));
    }
    imagePath.push(response.Key);
  }
  const data = await Book.create({ ...req.body, imagePath });
  res.send(result(200, data));
};

export const getImageResolver = async (req: any, res: any) => {
  const key = req.params.key;
  const readStream = await awsImageResponse(downloadFile(key));
  if (readStream.error) res.send(result(400, 'error get image'));
  console.log('here readStream', readStream);
  console.log('sss', res);
  readStream.response.pipe(res);
};

export const deleteImageResolver = async (req: any, res: any) => {
  const key = req.params.key;
  const { response, error } = await awsResponse(deleteFile(key));
  console.log(response);
  if (error) res.send(result(400, 'error delete image'));
  res.send(result(200, 'image is already been delete'));
};

export const bookFindManyResolver = async (req: any, res: any) => {
  const { text } = req.body;
  const projection = {
    bookTitle: 1,
    pax: 1,
    category: 1,
    imagePath: 1,
  };
  const data = await Book.find({ bookTitle: new RegExp(`${text}`, 'i') }, projection).populate({
    path: 'category',
    select: '_id nameCategory ',
  });
  console.log('dataa', data);
  if (!data) res.send(result(404, 'book is not found'));
  res.send(result(200, data));
};
