import { PrismaClient } from "@prisma/client";
import {
  AuthRepository,
  CredentialsNotMatchError,
  LogInCredentialsType,
} from "../model";

export class DbAuthFacade implements AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async logIn(logInCredentials: LogInCredentialsType): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: logInCredentials.username,
        password: logInCredentials.password,
      },
      select: {
        id: true,
      },
    });

    if (user === null) {
      throw new CredentialsNotMatchError(
        "Authentication failed: The provided username or password is incorrect."
      );
    }

    return user.id;
  }
}
