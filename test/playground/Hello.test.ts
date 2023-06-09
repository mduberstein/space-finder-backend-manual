// Clip 39, 48
import { handler } from '../../services/SpacesTable/Create';
// //Clip 43, 44, 45
// import { handler as readHandler } from '../../services/SpacesTable/Read'
import { APIGatewayProxyEvent } from 'aws-lambda';
// //Clip 46
// import { handler as updateHandler } from '../../services/SpacesTable/Update'
// //Clip 47
// import { handler as deleteHandler } from '../../services/SpacesTable/Delete'

// Clip 59, Debug Code
import {handler as authorizeHandler} from '../../services/node-lambda/hello'

// // Create
// const event = {
//    body: {
//       location: 'Paris'
//    }
// }
// handler (event as any, {} as any);

// //Read, Clip 43, scan
// const result = readHandler({} as any, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// //Read, Clip 44, scan
// const event: APIGatewayProxyEvent = {
//    queryStringParameters: {
//       spaceId: 'f87d915e-57bf-458f-8fec-33cd2de58391'
//    }
// } as any;

// // Read, Clip 45, query with secondary global index 
// const event: APIGatewayProxyEvent = {
//    queryStringParameters: {
//       location: 'London'
//    }
// } as any;
// const result = readHandler(event, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// Update, Clip 46
// const event: APIGatewayProxyEvent = {
//    queryStringParameters: {
//       spaceId: '227f4990-b3f0-4d6c-ba2e-580c5cd2260a'
//    },
//    body: {
//       location: 'new location'
//    }
// } as any;

// const result = updateHandler(event, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// // Delete, Clip 47
// const event: APIGatewayProxyEvent = {
//    queryStringParameters: {
//       spaceId: '227f4990-b3f0-4d6c-ba2e-580c5cd2260a'
//    },
// } as any;

// const result = deleteHandler(event, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// // Validate and Create, Clip 48
// const event: APIGatewayProxyEvent = {
//    body: {
//       name: 'some name'
//    },
// } as any;

// // Add Utils.ts and Create, Clip 49
// const event: APIGatewayProxyEvent = {
//    body: {
//       name: 'some name',
//       location: 'some location'
//    },
// } as any;

// const result = handler(event, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// DEBUG_CODE_CLIP59_START
const event1 = {
   "requestContext": {
      "resourceId": "pfzr6b",
       "authorizer": {
         "claims": {
           "sub": "9f831755-bf98-4152-b589-edbceac70e4e",
           "cognito:groups": "admins"
         }
      }
   }
};

const result = authorizeHandler(event1, {} as any);
console.log(`result: ${result}`);
// DEBUG_CODE_CLIP59_END





