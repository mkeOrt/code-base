import { User } from "@prisma/client";
import { LogInCredentialsType } from "./value-objects";

export interface AuthRepository {
  logIn(logInCredentials: LogInCredentialsType): Promise<User>;
}
