import multer from 'multer';
import Path from 'path';

const storage = multer.diskStorage({
    destination: './temp',
    filename: (req, file, callback) => {
        return callback(null, file.fieldname + '-' + Date.now() + Path.extname(file.originalname))
    }
})
const upload = multer({ storage });

export default upload;