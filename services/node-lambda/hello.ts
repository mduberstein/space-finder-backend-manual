import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';

const s3Client = new S3();

async function handler(event: unknown, context: any) {
   const buckets = await s3Client.listBuckets().promise();
   console.log('in handler of node lambda');
   return {
      statusCode: 200,
      body: 'Here are your buckets: ' + JSON.stringify(buckets.Buckets)
   }
}

export { handler } 