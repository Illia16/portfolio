const multipartParser = require('parse-multipart-data');
const helpers = require('../helpers');
const { MAX_FILE_SIZE, allowedTypes} = require('../helpers/ENUM');
const jwt = require('jsonwebtoken');

module.exports.handler = async (event, context) => {
    // Environment variables
    const STAGE = process.env.STAGE;
    const PROJECT_NAME = process.env.PROJECT_NAME;
    const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;
    const JWT_SECRET = process.env.JWT_SECRET;
    const API_URL = process.env.API_URL;
    
    const headers = event.headers;
    const allowedOrigins = ["http://localhost:3000", CLOUDFRONT_URL];
    const headerOrigin = allowedOrigins.includes(headers?.origin) ? headers?.origin : null;
    const action = event.httpMethod;
    const isBase64Encoded = event.isBase64Encoded;

    // AWS Resource names
    const s3Bucket = `${PROJECT_NAME}--s3-site--${STAGE}`;

    // Incoming data;
    let body;
    if (!isBase64Encoded) {
        body = JSON.parse(event.body);
    } else {
        const contentType = headers['Content-Type'] || headers['content-type'];
        const boundary = contentType.split('boundary=')[1];

        const getRawData = Buffer.from(event.body, 'base64');
        const parsedData = multipartParser.parse(getRawData, boundary);
        body = parsedData.reduce(function (result, currentObject) {
            if (currentObject.name !== 'file') {
                result[currentObject.name] = currentObject.data.toString('utf8');
            } else {
                result.file = [{
                    name: currentObject.name,
                    filename: currentObject.filename,
                    type: currentObject.type,
                    data: currentObject.data,
                    size: currentObject.data.length,
                }];
            }

            return result;
        }, {});

        const file = body?.file?.[0];
        if (file) {
            if (helpers.isFileTypeAllowed(file.type)) {
                console.log('file type not allowed...');
                return helpers.responseUnsupportedMediaType(headerOrigin);
            }
        }
    }

    if (action === 'GET') {
        const queries = event.queryStringParameters;
        console.log('queries', queries);
    
        if (!queries?.token) {
            return helpers.responseError(headerOrigin, 'Missing query parameter', 400);
        }

        let decoded;
        // Validate token
        try {
            decoded = jwt.verify(queries.token, JWT_SECRET);
            console.log('Token is ok.', decoded);
        } catch(err) {
            console.log('Err, token is invalid:', err);
            return helpers.responseError(headerOrigin, 'Token is invalid', 400);
        }
        
        if (!decoded.largeFilename) return helpers.responseError(headerOrigin, 'Token is invalid', 400);

        // Send url with redirect to the attachment
        try {
            const fileUrl = await helpers.s3GetSignedUrl(s3Bucket, `files/${decoded.largeFilename}`);
            return helpers.responseRedirect(fileUrl, 302)
        } catch (error) {
            console.error('Error getting signed URL', error);
            return helpers.responseError(headerOrigin, 'Error retrieving file', 500);
        }
    }

    if (action === 'POST') {
        // There's 3 scenarios:
        // 1) Email with no attachment.
        // 2) Email with attachment that's less than 5 Mb.
        // 3) Email with attachment that's larger than 5 Mb.
        //     3.1) Generate presign url and return it to FrontEnd.
        //     3.2) On FrontEnd, upload a file using the pre-sign url.
        //     3.3) Call the same api again passing "fileAsUrl". Send it via email a tokenized url to access the needed attachment. 
        if (body.fileAsUrl) {
            const token = jwt.sign({largeFilename: body.largeFilename}, JWT_SECRET, { expiresIn: '5m' });
            await helpers.sendEmailLargeAttachment({email: body.email, subject: body.subject, message: body.message, fileUrl: `${API_URL}?token=${token}`});
            return helpers.responseSuccess(headerOrigin, {success: true});
        } else {
            const file = body?.file?.[0];
            // No attachment
            if (!file && !body.largeFilename) {
                await helpers.sendEmailSmallAttachment({email: body.email, subject: body.subject, message: body.message});
                return helpers.responseSuccess(headerOrigin, {success: true, data: null});
            } else if (file?.size < 5242880) {
                // Attachment, but less than 5 Mb
                await helpers.sendEmailSmallAttachment({email: body.email, subject: body.subject, message: body.message, file: file});
                return helpers.responseSuccess(headerOrigin, {success: true, data: null});
            } else {
                // TODO: validate by allowedType (not working)
                // const contentTypeConditions = allowedTypes.map((type) => ['starts-with', '$Content-Type', type]);
                // Attachment, but it's large so create presign url, return to frontend
                const presignedData = await helpers.s3PostSignedUrl(
                    s3Bucket, 
                    `files/${body.largeFilename}`,
                    [
                        { bucket: s3Bucket }, 
                        ["starts-with", "$key", "files"],
                        ['content-length-range', 0, MAX_FILE_SIZE],
                        // ...contentTypeConditions,
                    ]
                );
                return helpers.responseSuccess(headerOrigin, {success: true, data: presignedData});
            }
        }
    }

    return helpers.responseSuccess();
};
