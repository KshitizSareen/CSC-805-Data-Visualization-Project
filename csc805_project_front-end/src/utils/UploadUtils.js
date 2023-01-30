import S3 from 'react-aws-s3';
import uuid from 'react-uuid';


const config = {
    bucketName: 'csc805-data-storage-bucket',
    region: 'us-west-1',
    accessKeyId: 'AKIA6N5QQL7VUGPTFI5E',
    secretAccessKey: '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',
}

const ReactS3Client = new S3(config);
window.Buffer = window.Buffer || require("buffer").Buffer;


export const UploadImage = async (images)=>{
    // here image is url/location of image
    const imageURLS=[];
    for(const image of images)
    {
    if(image!=="")
    {
    let blob = await fetch(image).then(r => r.blob());
    const imageData = await ReactS3Client.uploadFile(blob,uuid()+'.png');
    imageURLS.push(imageData.location);
    }
    else
    {
    imageURLS.push("");
    }
    }
    return imageURLS;
}