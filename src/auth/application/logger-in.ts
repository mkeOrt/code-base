import { AuthRepository, LogInCredentials } from "../model";
import { InvalidLoginCredentials } from "../model/exceptions";

export class LoggerIn {
  constructor(private readonly authRepository: AuthRepository) {}

  public exec(data: unknown): Promise<number> {
    let logInCredentials;

    try {
      logInCredentials = LogInCredentials.parse(data);
    } catch (error: any) {
      throw new InvalidLoginCredentials(
        "Authentication failed: Invalid username or password.",
        "Invalid credentials format: Please ensure the username and password meet the required criteria."
      );
    }

    return this.authRepository.logIn(logInCredentials);
  }
}
