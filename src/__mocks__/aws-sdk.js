var fs = require('fs');

class S3 {
    upload(op, callback) {
        return callback();
    };
    getFileFromBucket(bucket, objectKey, reject){
        return {
            promise: () => {
                return new Promise((resolve, reject) => {
                    if (params.Key !== "test-notexisting.jpg") {
                        return resolve({Body: fs.readFileSync(`${__dirname}/puppy.jpg`)});
                    }

                    return reject({ErrorCode: "NotExisting"});
                });
            }
        }
    };
    getObject(params) {

        return {
            promise: () => {
                return new Promise((resolve, reject) => {
                    if (params.Key !== "test-notexisting.jpg") {
                        return resolve({Body: fs.readFileSync(`${__dirname}/puppy.jpg`)});
                    }

                    return reject({ErrorCode: "NotExisting"});
                });
            }
        }

    }
}

module.exports.S3 = S3;