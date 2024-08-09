import { PrismaClient, User } from "@prisma/client";
import {
  AuthRepository,
  CredentialsNotMatchError,
  LogInCredentialsType,
} from "../model";

export class DbAuthFacade implements AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async logIn(logInCredentials: LogInCredentialsType): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: logInCredentials.username,
      },
    });

    if (user === null) {
      throw new CredentialsNotMatchError(
        "Authentication failed: The provided username or password is incorrect."
      );
    }

    return user;
  }
}
