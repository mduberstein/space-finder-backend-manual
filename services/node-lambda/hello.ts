import { APIGatewayProxyEvent } from 'aws-lambda';
// Until Clip 59 Access control with Cognito Groups
// import { APIGateway, S3 } from 'aws-sdk';
// const s3Client = new S3();

async function handler(event: APIGatewayProxyEvent, context: any) 
{
   // Until Clip 59 Access control with Cognito Groups
   // const buckets = await s3Client.listBuckets().promise();
   // console.log('in handler of node lambda');
   if(isAuthorized(event)){
      return {
         statusCode: 200,
         // Until Clip 59 Access control with Cognito Groups
         // body: 'Here are your buckets: ' + JSON.stringify(buckets.Buckets)
         // In Clip 59
         body: JSON.stringify('You are authorized!')
      } 
   } else {
      return {
         statusCode: 401,
         body: JSON.stringify('You are not authorized!')
      }  
   }
}

function isAuthorized(event: APIGatewayProxyEvent){
   const groups = event.requestContext.authorizer?.claims['cognito:groups'];
   if(groups){
      return (groups as string).includes('admins');
   } else {
      return false;
   }
} 

// // DEBUG_CODE_CLIP59_START
// async function handler(event: any, context: any) 
// {
//    // Until Clip 59 Access control with Cognito Groups
//    // const buckets = await s3Client.listBuckets().promise();
//    // console.log('in handler of node lambda');
//    if(isAuthorized(event)){
//       return {
//          statusCode: 200,
//          // Until Clip 59 Access control with Cognito Groups
//          // body: 'Here are your buckets: ' + JSON.stringify(buckets.Buckets)
//          // In Clip 59
//          body: JSON.stringify('You are authorized!')
//       } 
//    } else {
//       return {
//          statusCode: 401,
//          body: JSON.stringify('You are not authorized!')
//       }  
//    }
// }

// function isAuthorized(event: any){
//    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
//    if(groups){
//       return (groups as string).includes('admins');
//    } else {
//       return false;
//    }
// } 
// // DEBUG_CODE_CLIP59_END

export { handler }  