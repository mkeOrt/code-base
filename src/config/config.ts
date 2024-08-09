export class Config {
  private static instance: Config;

  public readonly port = (process.env.PORT && +process.env.PORT) || 3000;

  public readonly jwtPrivateKey =
    process.env.JWT_PRIVATE_KEY || "JWT_PRIVATE_KEY";

  public readonly jwtPublicKey = process.env.JWT_PUBLIC_KEY || "JWT_PUBLIC_KEY";

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }
}
