import express, { Router } from 'express';

import { ocr} from '../controller/ocr-controller.js';

const router = express.Router();


router.post('/ocrs', ocr);

export default router;