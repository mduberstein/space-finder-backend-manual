import {Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda'
import { join } from 'path';
import { AuthorizationType, LambdaIntegration, MethodOptions, RestApi} from 'aws-cdk-lib/aws-apigateway'
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { AuthorizerWrapper } from './auth/AuthorizerWrapper';

export class SpaceStack extends Stack {
   private api = new RestApi(this, 'SpaceApi');
   private authorizer: AuthorizerWrapper;

   private spacesTable = new GenericTable(this, {
      tableName: 'SpacesTable',
      primaryKey: 'spaceId',
      createLambdaPath: 'Create',
      readLambdaPath: 'Read',
      updateLambdaPath: 'Update',
      deleteLambdaPath: 'Delete',
      secondaryIndexes: ['location']
   })

   constructor(scope: Construct, id: string,  props: StackProps) {
      super(scope, id, props)

      this.authorizer = new AuthorizerWrapper(this, this.api);

      const helloLambda = new LambdaFunction (this, 'helloLambda', {
         runtime: Runtime.NODEJS_18_X,
         code: Code.fromAsset(join( __dirname, '..', 'services', 'hello')),
         handler: 'hello.main'
      });
      // Hello Api lambda integration:
      const helloLambdaIntegration = new LambdaIntegration(helloLambda);
      const helloLambdaResource = this.api.root.addResource('hello');
      helloLambdaResource.addMethod('GET', helloLambdaIntegration);


      const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
         entry: join( __dirname, '..', 'services', 'node-lambda', 'hello.ts'),
         handler: 'handler'
      })

      const s3ListPolicy = new PolicyStatement();
      s3ListPolicy.addActions('s3:ListAllMyBuckets');
      s3ListPolicy.addResources('*');
      helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

      const optionsWithAuthorizer: MethodOptions = {
         authorizationType: AuthorizationType.COGNITO,
         authorizer: {
            authorizerId: this.authorizer.authorizer.authorizerId
         }
      }

      // HelloNodeJs Api integration
      const helloLambdaNodeJsIntegration = new LambdaIntegration(helloLambdaNodeJs);
      const helloLambdaNodeJsResource = this.api.root.addResource('helloNodeJs');
      // SpaceUserAuthorizer is associated with the GET method of /helloLambdaNodeJs in the next line
      helloLambdaNodeJsResource.addMethod('GET', helloLambdaNodeJsIntegration, optionsWithAuthorizer);

      //Spaces API Integrations
      const spaceResource = this.api.root.addResource('spaces');
      spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
      spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
      spaceResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
      spaceResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);
   }  



} 