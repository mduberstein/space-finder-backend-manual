// import { handler } from '../../services/SpacesTable/Create';
import { APIGateway } from 'aws-sdk';
import { handler as readHandler } from '../../services/SpacesTable/Read'
import { APIGatewayProxyEvent } from 'aws-lambda';

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
const event: APIGatewayProxyEvent = {
   queryStringParameters: {
      spaceId: 'f87d915e-57bf-458f-8fec-33cd2de58391'
   }
} as any;
const result = readHandler(event, {} as any);
result.then((apiResult)=>{
   const items = JSON.parse(apiResult.body);
   console.log(items);
})





