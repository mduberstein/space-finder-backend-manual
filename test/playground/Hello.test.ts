// import { handler } from '../../services/SpacesTable/Create';
import { handler as readHandler } from '../../services/SpacesTable/Read'

// // Create
// const event = {
//    body: {
//       location: 'Paris'
//    }
// }
// handler (event as any, {} as any);

// Read
const result = readHandler({} as any, {} as any);
result.then((apiResult)=>{
   const items = JSON.parse(apiResult.body);
   console.log(items);
})