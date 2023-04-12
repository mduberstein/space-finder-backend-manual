import { v4 } from 'uuid'
async function handler(event: unknown, context: any) {
   return {
      statusCode: 200,
      body: 'Hello from a ts Lambda' +v4()
   }
}

export { handler } 