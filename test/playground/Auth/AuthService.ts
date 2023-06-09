import { Auth, Amplify } from 'aws-amplify';
import { config } from './config'
import { CognitoUser } from '@aws-amplify/auth';

// there was no intellisense or type information here
Amplify.configure ({
   Auth: {
      mandatorySignIn: false,
      region: config.REGION,
      userPoolId: config.USER_POOL_ID,
      userPoolWebClientId: config.APP_CLIENT_ID,
      authenticationFlowType: 'USER_PASSWORD_AUTH'
   }
})
export class AuthService {
   public async login(userName: string, password: string){
      const user = await Auth.signIn(userName, password) as CognitoUser;
      return user;
   }
}