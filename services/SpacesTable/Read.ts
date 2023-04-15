import { AWSError, DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters, APIGatewayProxyResult, Context } from 'aws-lambda';

// no default initialization for TABLE_NAME to demo the ! operator, non-null assertion instructor used
// non-null assertion is a bad practice by eslint 
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY || 'UnknownPrimaryKey';
const dbClient = new DynamoDB.DocumentClient();

async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
   const result: APIGatewayProxyResult = {
      statusCode: 200,
      body: 'Hello from DynamoDb'
   };

   try {
      if(event.queryStringParameters){
         if( PRIMARY_KEY in event.queryStringParameters ) {
            result.body = await queryWithPrimaryPartition(event.queryStringParameters);
         } else {
            result.body = await queryWithSecondaryPartition(event.queryStringParameters)
         }
      } else {
         result.body = await scanTable();
      }

   } catch(error: unknown) {
      const typedError = error as AWSError;
      result.body = typedError.message;
   }
   return result;

}

async function queryWithSecondaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters) {
   const queryKey = Object.keys(queryParams)[0];
   const queryValue = queryParams[queryKey];
   const queryResponse = await dbClient.query({
      TableName: TABLE_NAME!,
      IndexName: queryKey, // global secondary index name
      KeyConditionExpression: '#zz = :zzzz',
      ExpressionAttributeNames: {
         '#zz': queryKey
      },
      ExpressionAttributeValues: {
         ':zzzz': queryValue
      }
   }).promise();
   return JSON.stringify(queryResponse.Items);
}

async function queryWithPrimaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters) {
   const keyValue = queryParams[PRIMARY_KEY];
   const queryResponse = await dbClient.query({
      TableName: TABLE_NAME!,
      KeyConditionExpression: '#zz = :zzzz',
      ExpressionAttributeNames: {
         '#zz': PRIMARY_KEY
      },
      ExpressionAttributeValues: {
         ':zzzz': keyValue
      }
   }).promise();
   return JSON.stringify(queryResponse.Items);
}

async function scanTable() {
   const queryResponse = await dbClient.scan({
      TableName: TABLE_NAME!
   }).promise();
   return JSON.stringify(queryResponse.Items);
}

export {handler};


