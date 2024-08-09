export class Config {
  private static instance: Config;

  public readonly port = (process.env.PORT && +process.env.PORT) || 3000;

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }
}
