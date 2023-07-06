import multer, { Multer, StorageEngine } from 'multer';
import { randomUUID } from 'node:crypto';

const storage: StorageEngine = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomUUID()}`; // Gera um sufixo único para evitar nomes duplicados
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  }
});

export const upload: Multer = multer({ storage });
