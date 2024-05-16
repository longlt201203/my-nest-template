import multer from "multer";
import * as fs from "fs";

const uploadsFolder = "uploads";

export const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder);
    }
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    const fileInfo = file.originalname.split(".");
    let filename = file.originalname;
    let filepath = `${uploadsFolder}/${filename}`;
    let i = 1;
    while (fs.existsSync(filepath)) {
      filename = fileInfo[0] + ` (${i})` + (fileInfo.length > 1 ? "." + fileInfo[1] : "");
      filepath = `${uploadsFolder}/${filename}`;
      i++;
    }
    cb(null, filename);
  }
});