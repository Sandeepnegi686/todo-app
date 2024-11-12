import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // console.log(req.body.name);
    console.log(file, req.body);
    const fileName = uniqueSuffix + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
