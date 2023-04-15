import { AWSError, DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const TABLE_NAME = process.env.TABLE_NAME as string;
const PRIMARY_KEY = process.env.PRIMARY_KEY || 'UnknownPrimaryKey';
const dbClient = new DynamoDB.DocumentClient();

async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
   const result: APIGatewayProxyResult = {
      statusCode: 200,
      body: 'Hello from DynamoDb'
   };

   const requestBody = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
   const spaceId = event.queryStringParameters?.[PRIMARY_KEY]
   if(requestBody && spaceId) {
      // NOTE by MD: this implementation only uses the first property in the body
      // can be improved to use all the properties from the body of the request
      // to updated an item
      const requestBodyKey = Object.keys(requestBody)[0];
      const requestBodyValue = requestBody[requestBodyKey];

      const updateResult = await dbClient.update({
         TableName: TABLE_NAME,
         Key: {
            // computed property name
            [PRIMARY_KEY]: spaceId
         }, 
         UpdateExpression: 'set #zzzNew = :new',
         ExpressionAttributeValues: {
            ':new': requestBodyValue
         },
         ExpressionAttributeNames: {
            '#zzzNew': requestBodyKey
         },
         ReturnValues: 'UPDATED_NEW'
      }).promise();
      result.body = JSON.stringify(updateResult);
   }
   return result;
}


export {handler};