import express from 'express';
import { upload } from './controller/mutler';
import {
  createBookResolver,
  getImageResolver,
  deleteImageResolver,
  bookFindManyResolver,
} from './controller/imageResolver';

const router = express.Router();

// router.post('/createBook', upload.single('image'), uploadImageResovler); example upload single image
router.get('/image/:key', getImageResolver);
router.post('/createBook', upload.array('images'), createBookResolver);
router.post('/delete/:key', deleteImageResolver);
router.post('/getAllBook', bookFindManyResolver);

export = router;
