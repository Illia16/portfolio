const mime = require('mime-types');
const { createMimeMessage } = require('mimetext');
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
const clientEmail = new SESv2Client();

const { GetObjectCommand, PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const clientS3 = new S3Client();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");

const { MAX_FILE_SIZE, allowedTypes} = require('./ENUM');

module.exports =  {
    sendEmailSmallAttachment: async (data) => {
        const message = createMimeMessage();
        message.setSender(`${process.env.PROJECT_NAME}-${process.env.STAGE}@devemail.illusha.net`);
        message.setRecipients(process.env.EMAIL);
        message.setSubject(`${data.subject} - from ${data.email}`);
        message.addMessage({
            contentType: 'text/plain',
            data: data.message,
        });

        if (data.file) {
            const base64Data = data.file.data.toString('base64');
            const contentType = mime.lookup(data.file.filename);
            
            message.addAttachment({
                filename: data.file.filename,
                contentType: contentType,
                data: base64Data,
            });
        }

        const input = {
            Content: {
                Raw: {
                    Data: Buffer.from(message.asRaw(), 'utf8'),
                },
            }
        };

        const command = new SendEmailCommand(input);
        try {
            await clientEmail.send(command);
        } catch (error) {
            console.log('error sendEmailSmallAttachment:', error);
            throw new Error("sendEmailSmallAttachment:", error);
        }
    },
    sendEmailLargeAttachment: async (data) => {
        const message = createMimeMessage();
        message.setSender(`${process.env.PROJECT_NAME}-${process.env.STAGE}@devemail.illusha.net`);
        message.setRecipients(process.env.EMAIL);
        message.setSubject(`${data.subject} - from ${data.email}`);
        message.addMessage({
            contentType: 'text/html',
            data: `${data.message}<br><br>` +
                `Attachment can be found <a href=${data.fileUrl}>here</a><br><br>`
        });

        const input = {
            Content: {
                Raw: {
                    Data: Buffer.from(message.asRaw(), 'utf8'),
                },
            }
        };

        const command = new SendEmailCommand(input);
        try {
            await clientEmail.send(command);
        } catch (error) {
            console.log('error sendEmailLargeAttachment:', error);
            throw new Error("sendEmailLargeAttachment:", error);
        }
    },
    s3UploadFile: async (s3_buckname, filenamepath, streamdata) => {
        const params = {
            Bucket: s3_buckname,
            Key: filenamepath,
            Body: streamdata,
        };

        const command = new PutObjectCommand(params);

        try {
            await clientS3.send(command);
        } catch (err) {
            console.error('s3_error_s3UploadFile:', err);
            throw new Error("s3_error_s3UploadFile:", err);
        }
    },
    s3GetSignedUrl: async (s3_buckname, filenamepath) => {
        const command = new GetObjectCommand({ Bucket: s3_buckname, Key: filenamepath });
        const file = await getSignedUrl(clientS3, command, { expiresIn: 60 }); // 1 minute
        return file;
    },
    s3PostSignedUrl: async (s3_buckname, filenamepath, conditions) => {
        const res = await createPresignedPost(clientS3, {
            Bucket: s3_buckname,
            Key: filenamepath,
            Conditions: conditions,
            Expires: 900, // 15 mins
          });

        return res;
    },
    isFileTooLarge: (fileSize) => {
        return fileSize > MAX_FILE_SIZE;
    },
    isFileTypeAllowed: (fileType) => {
        return !allowedTypes.includes(fileType);
    },
    responseSuccess: (headerOrigin, data = null) =>  {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": headerOrigin,
            },
            body: JSON.stringify(data),
        };
    },
    responseError: (headerOrigin, message = 'Error occurred', statusCode = 500) => ({
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": headerOrigin,
        },
        body: JSON.stringify({ success: false, message }),
    }),
    responseRedirect: (newUrl, statusCode) => ({
        statusCode,
        headers: {
            Location: newUrl,
        },
        body: JSON.stringify({ success: true }),
    }),
    responsePayloadTooLarge: (headerOrigin) => {
        return {
            statusCode: 413,
            headers: {
                "Access-Control-Allow-Origin": headerOrigin,
            },
            body: JSON.stringify({
                message: "File size exceeds the maximum allowed limit.",
            }),
        };
    },
    responseUnsupportedMediaType: (headerOrigin) => {
        return {
            statusCode: 415,
            headers: {
                "Access-Control-Allow-Origin": headerOrigin,
            },
            body: JSON.stringify({
                message: "Unsupported file type. Allowed types are images, PDF, DOC, DOCX, TXT, audio, and video files.",
            }),
        };
    }
};