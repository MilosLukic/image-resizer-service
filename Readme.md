# image-resizer-service

Test by running

`npm run test`

All tests should go through

You should have imagemagick installed

`sudo apt install imagemagick`



This fork updates the base application so it saves the resized image in the specified bucket.

This serverless application deploys a Lambda function and API Gateway to your AWS account that reads images from a S3 bucket (whose name defined at deployment) and serves them through API Gateway.

The API Gateway respects the file organization on S3 bucket. For example, an image stored in s3://example-bucket/example-folder/example.jpg will be served from https://ujwegmxxah.execute-api.us-east-1.amazonaws.com/production/example-folder/example.jpg

To resize the same image, simply give dimensions as `width` and `height` before the file type postfix (e.g. someimage.640x480.png).

Resized image will then be saved to your bucket (besides the original), so make sure you have put object permissions.

It's meant to create static website hosting on your bucket, which redirects to this api if the file is not found. The api the resizes it and saves it so the next time the file is requested, it's already cached in the bucket. 

After deploying the application, you are strongly recommended to deploy a CDN distribution in front of API Gateway, so your responses are cached and it will improve performance and reduce costs significantly.



## Release Notes

### 0.1.1

- Major refactor, increase test coverage, full ES6 migration.
- ability to adjust Lambda memmory size.

### 0.1

Initial version

## License

MIT License (MIT)
