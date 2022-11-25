//const express = require("express");
// multer takes the image data and stores it in memory
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// sharp is a nodejs image processing library
//const sharp = require("sharp");
// const dotenv = require("dotenv");
// get access keys from env vars so we can send images to bucket
// dotenv.config();
//BUCKET_NAME = "cs565bucket";
//BUCKET_REGION = "us-west-2";
//ACCESS_KEY = "AKIA5D7SBQ3LYAQITINR";
//SECRET_ACCESS_KEY = "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";

//bucketName = process.env.BUCKET_NAME;
//bucketRegion = process.env.BUCKET_REGION;
//accessKey = process.env.ACCESS_KEY;
//secretAccessKey = process.env.SECRET_ACCESS_KEY;
let s3Function = {};
module.exports = s3Function;
const bucketName = "cs565bucket";
const bucketRegion = "us-west-2";
const accessKey = "AKIA5D7SBQ3LYAQITINR";
const secretAccessKey = "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";
// AWS objs to make, put, get bucket
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  // DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});




s3Function.setImage = async function (pic) {
  // this is our image we send to s3
  const file = pic;

  // generate uniqueKeyValue
  const key = new Date().getISOString();
  const uploadParams = {
     Bucket: bucketName,
    Body: file,
    Key: key,
    ContentType: file.mimetype,
  };
  await s3Client.send(new PutObjectCommand(uploadParams));

    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

  // get bucket url so we can get image
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
  console.log(url);
  return {url, key};
}


// app.post("/upload", upload.single("picture"), async (req, res) => {
  // req.file.buffer is our image we send to S3
  // const file = req.file.buffer;
  //console.log(req.file.buffer);
  // here we can generate a unique name for the file or just let it be original fileName
  // let fileName = req.file.originalname;
  // let fileName = "matt";



