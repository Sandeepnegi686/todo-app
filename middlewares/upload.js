import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // console.log(req.body.name);
    const fileName = uniqueSuffix + "-" + file.originalname;
    // console.log(fileName);
    req.fileName = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
