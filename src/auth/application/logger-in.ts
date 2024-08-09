import * as argon2 from "argon2";
import {
  AuthRepository,
  LoggedIn,
  LogInCredentials,
  TokenGenerator,
} from "../model";
import {
  CredentialsNotMatchError,
  InvalidLoginCredentials,
} from "../model/exceptions";
import jwt from "jsonwebtoken";
import { Config } from "../../config/config";

export class LoggerIn {
  private readonly config = Config.getInstance();

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public async exec(data: unknown): Promise<LoggedIn> {
    let logInCredentials;

    try {
      logInCredentials = LogInCredentials.parse(data);
    } catch (error: any) {
      throw new InvalidLoginCredentials(
        "Authentication failed: Invalid username or password.",
        "Invalid credentials format: Please ensure the username and password meet the required criteria."
      );
    }

    const user = await this.authRepository.logIn(logInCredentials);
    const passwordMatch = await argon2.verify(
      user.password,
      logInCredentials.password
    );

    if (!passwordMatch) {
      throw new CredentialsNotMatchError(
        "Authentication failed: The provided username or password is incorrect."
      );
    }

    const bearerToken = this.tokenGenerator.sign(
      { id: user.id },
      { audience: "myaud", issuer: "myissuer", jwtid: "1", subject: "user" }
    );

    return {
      bearerToken,
    };
  }
}
