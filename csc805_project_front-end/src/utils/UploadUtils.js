import S3 from 'react-aws-s3';
import uuid from 'react-uuid';


const config = {
    bucketName: 'csc805-data-storage-bucket',
    region: 'us-west-1',
    accessKeyId: 'REACT_APP_ACCESS_KEY_ID',
    secretAccessKey: 'REACT_APP_SECRET_ACCESS_KEY_ID/',
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