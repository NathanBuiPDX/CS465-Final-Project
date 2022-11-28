const dotenv = require('dotenv');
const s3Function = {};
module.exports = s3Function;

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
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


s3Function.setImage = async function (pic) {
  // this is our image we send to s3
  try {
    const file = pic;

    // generate uniqueKeyValue
    const key = new Date().toISOString();
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
    return { url, key };
  } catch (err) { console.log("S3 ERROR: ", err) }
}

s3Function.getImage = async function (picToGet) {
  // this is our image we send to s3
  try {
    const key = picToGet;
    const getParams = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    console.log("S3 GET recievedKEY:", key);
    const url = await getSignedUrl(s3Client, getParams, { expiresIn: 3600 });
    console.log("S3 URL:  ", url);
    return url
  } catch (err) {
    console.log("S3 ERROR: ", err);
  }
};

s3Function.deleteImage = async function (picToDelete) {
  // this is our image we send to s3
  try {
    const key = picToDelete;

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    console.log('S3 delete recievedKEY:', key)
    await s3Client.send(new DeleteObjectCommand(deleteParams));

  } catch (err) {
    console.log("S3 ERROR: ", err);
  }
};