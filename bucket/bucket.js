const express = require("express");
// multer takes the image data and stores it in memory
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// sharp is a nodejs image processing library
const sharp = require("sharp");
const dotenv = require("dotenv");
// get access keys from env vars so we can send images to bucket
dotenv.config();
bucketName = process.env.BUCKET_NAME;
bucketRegion = process.env.BUCKET_REGION;
accessKey = process.env.ACCESS_KEY;
secretAccessKey = process.env.SECRET_ACCESS_KEY;
// AWS objs to make, put, get bucket
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello World!");
  res.end();
});

app.get("/views", async (req, res) => {
  res.status(200);
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: "matt",
  });
  // get bucket url so we can get image
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  console.log(url);
  //res.contentType("image/jpg");
  res.end("<img src='" + url + "'/>");
 
});

app.post("/upload", upload.single("picture"), async (req, res) => {
  // req.file.buffer is our image we send to S3
  const file = req.file.buffer;
  console.log(req.file.buffer);
  // here we can generate a unique name for the file or just let it be original fileName
  // let fileName = req.file.originalname;
  let fileName = "matt";
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: fileName,
    ContentType: file.mimetype,
  };
  await s3Client.send(new PutObjectCommand(uploadParams));
  res.end();
});

app.get("/del", (req, res) => {
  //why does app.delete not work? bc we're getting s3 bucket?
  key = "matt";
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };
  
  s3Client.send(new DeleteObjectCommand(deleteParams));
  console.log("testdelete");
 
  //res.send(url);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
