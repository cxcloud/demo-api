import { POST, Path, Context, ServiceContext } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Customers } from '@cxcloud/facade/dist/commerce';
import {
  SignInResult,
  AnonymousSignInResult
} from '@cxcloud/facade/dist/sdk/types/customers';

interface ILogin {
  username: string;
  password: string;
}

@Path('/auth')
export class AuthController {
  @Context ctx: ServiceContext;

  @Path('/user')
  @Tags('auth')
  @POST
  loginUser(body: ILogin): Promise<SignInResult> {
    const { username, password } = body;
    return Customers.login(
      username,
      password,
      this.ctx.response.locals.authToken
    );
  }

  @Path('/anonymous')
  @Tags('auth')
  @POST
  loginAnonymous(): Promise<AnonymousSignInResult> {
    return Customers.loginAnonymously();
  }
}
