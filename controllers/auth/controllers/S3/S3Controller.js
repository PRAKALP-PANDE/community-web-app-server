import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
    GetObjectCommand,
    PutObjectCommand,
    S3,
} from "@aws-sdk/client-s3";

const getUploadUrl = async (req, res) => {

    const s3 = new S3({
        // The key apiVersion is no longer supported in v3, and can be removed.
        // @deprecated The client uses the "latest" apiVersion.
        apiVersion: "2006-03-01",
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        },
        region: process.env.region,
        // The key signatureVersion is no longer supported in v3, and can be removed.
        // @deprecated SDK v3 only supports signature v4.
        signatureVersion: "v4",
    });
    
    const { fileName, fileType } = req.query;

    // Basic validation
    if (!fileName || !fileType) {
        return res
            .status(400)
            .json({ error: "fileName and fileType are required" });
    }

    // Set up S3 parameters
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
        // Expires: 60, // URL expiration time in seconds
    };

    try {
        // Generate a signed URL for uploading
        const uploadURL = await getSignedUrl(s3, new PutObjectCommand(params), {
            expiresIn: 60,
        });

        // Generate a non-expiring download URL
        const downloadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
        };
        const downloadURL = await getSignedUrl(
            s3,
            new GetObjectCommand(downloadParams),
            {
                expiresIn: 60,
            }
        );

        res.json({ uploadURL, downloadURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate presigned URLs" });
    }
};

const getDownloadUrl = async (req, res) => {
    const { fileName } = req.query;

    // Basic validation
    if (!fileName) {
        return res.status(400).json({ error: "fileName is required" });
    }

    // Set up S3 parameters
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        // Expires: 60, // URL expiration time in seconds
    };

    try {
        // Generate a signed URL for downloading
        const downloadURL = await getSignedUrl(s3, new GetObjectCommand(params), {
            expiresIn: 60,
        });
        res.json({ downloadURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate presigned URL" });
    }
};

const deleteObject = async (req, res) => {
    let key;

    // Extract filename from query parameters
    const { s3Url, fileName } = req.query;

    // Validate and extract key from either s3Url or fileName
    if (s3Url) {
        const parts = s3Url.split("/");
        key = parts[parts.length - 1];
    } else if (fileName) {
        key = fileName;
    } else {
        return res.status(400).json({ error: "s3Url or fileName is required" });
    }

    // Set up S3 parameters
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    };

    try {
        // Delete the object from S3
        await s3.deleteObject(params);
        res.json({ message: "Object deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete object from S3" });
    }
};

export { getUploadUrl, getDownloadUrl, deleteObject }