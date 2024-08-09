import * as argon2 from "argon2";
import { AuthRepository, LoggedIn, LogInCredentials } from "../model";
import {
  CredentialsNotMatchError,
  InvalidLoginCredentials,
} from "../model/exceptions";

export class LoggerIn {
  constructor(private readonly authRepository: AuthRepository) {}

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

    return {
      bearerToken: "hereisthetoken",
    };
  }
}
