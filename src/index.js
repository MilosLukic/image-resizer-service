const url = require('url');
const {errorResponse} = require("./response");
const {original, resize} = require("./image");
const stream = require('stream');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.handler = (event) => new Promise((resolve, reject) => {
    const imageBucket = process.env.IMAGE_BUCKET;

    if (!imageBucket) {
        return reject(`Error: Set environment variable IMAGE_BUCKET`);
    }

    const path = event.path;
    const baseKey = url.parse(path).pathname.replace(/^\/+/g, '');
    const queryParameters = {width: baseKey.split(".")[1].split("x")[0], height: baseKey.split(".")[1].split("x")[1]};
    const objectKey = [baseKey.split(".")[0], baseKey.split(".")[2]].join('.');

    if (!queryParameters.width && !queryParameters.height) {
        return original(imageBucket, objectKey)
            .then(resolve)
            .catch(reject);
    }

    const width = parseInt(queryParameters.width);
    const height = parseInt(queryParameters.height);
    if ((queryParameters.width && isNaN(width)) || (queryParameters.height && isNaN(height))) {
        return reject(errorResponse(`width and height parameters must be integer`, 400));
    }

    var resizedImage = resize(imageBucket, objectKey, width, height);
    var savedImage = resizedImage.then(
        function(response) {
            return new Promise((resolve, reject) => {
                const params = {
                     Bucket: process.env.IMAGE_BUCKET, // pass your bucket name
                     Key: baseKey, // file will be saved as testBucket/contacts.csv
                     Body: response.body,
                    CacheControl: 'max-age=2312312',
                 };

                 s3.upload(params, function(s3Err, data) {
                    response.body = response.body.toString("base64");
                    resolve(response);
                     if (s3Err) throw s3Err;
                 });
            });
        }
    );

    return savedImage
        .then(resolve)
        .catch(reject);
});
