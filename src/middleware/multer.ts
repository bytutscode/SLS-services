import multer from 'multer';
import Path from 'path';


const upload = multer({ storage: multer.memoryStorage() });

export default upload;