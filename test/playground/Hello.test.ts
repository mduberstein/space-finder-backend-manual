// import { handler } from '../../services/SpacesTable/Create';
import { APIGateway } from 'aws-sdk';
// import { handler as readHandler } from '../../services/SpacesTable/Read'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler as updateHandler } from '../../services/SpacesTable/Update'

// // Create
// const event = {
//    body: {
//       location: 'Paris'
//    }
// }
// handler (event as any, {} as any);

// Read, Clip 43, scan
// const result = readHandler({} as any, {} as any);
// result.then((apiResult)=>{
//    const items = JSON.parse(apiResult.body);
//    console.log(items);
// })

// Read, Clip 44, scan
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

// Read, Clip 46, Update
const event: APIGatewayProxyEvent = {
   queryStringParameters: {
      spaceId: '227f4990-b3f0-4d6c-ba2e-580c5cd2260a'
   },
   body: {
      location: 'new location'
   }
} as any;

const result = updateHandler(event, {} as any);
result.then((apiResult)=>{
   const items = JSON.parse(apiResult.body);
   console.log(items);
})





