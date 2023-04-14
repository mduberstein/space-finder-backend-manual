// type Table in {} and intellisense will suggest the lib
import { Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';

export interface TableProps {
   tableName: string,
   primaryKey: string
   createLambdaPath?: string,
   readLambdaPath?: string,
   updateLambdaPath?: string,
   deleteLambdaPath?: string,

}
export class GenericTable {
   private table: Table;

   private createLambda: NodejsFunction | undefined;
   private readLambda: NodejsFunction | undefined;
   private updateLambda: NodejsFunction | undefined;
   private deleteLambda: NodejsFunction | undefined;

   public createLambdaIntegration: LambdaIntegration;
   public readLambdaIntegration: LambdaIntegration;
   public updateLambdaIntegration: LambdaIntegration;
   public deleteLambdaIntegration: LambdaIntegration;

	constructor(private stack: Stack, private props: TableProps) {
			this.initialize();
	}

	private initialize() {
      this.createTable();
	}

	private createTable() {
		this.table = new Table(this.stack, this.props.tableName, {
			partitionKey: {
				name: this.props.primaryKey,
				type: AttributeType.STRING
			},
         tableName: this.props.tableName
		});
   }

   private createSingleLambda(lambdaName: string): NodejsFunction {
      const lambdaId = `${this.props.tableName}-${lambdaName}`
      return new NodejsFunction(this.stack, lambdaId, {
         entry: join(__dirname, '..', 'services', this.props.tableName, `${lambdaName}.ts`),
         handler: 'handler'
      })   
   }
}