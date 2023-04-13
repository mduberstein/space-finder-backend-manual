import {S3} from 'aws-sdk' ;

const s3Client = new S3();


async function handler(event: any, context: any) {
   const buckets = await s3Client.listBuckets().promise();
   console.log('Got and event:');
   console.log(event);
   return {
      statusCode: 200,
      body: 'Heare are your buckets: ' + JSON.stringify(buckets.Buckets)
   }
}

export { handler };
