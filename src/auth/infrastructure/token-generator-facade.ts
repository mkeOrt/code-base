import jwt from "jsonwebtoken";

export class TokenGeneratorFacade {
  constructor(
    private readonly secretOrPrivateKey: jwt.Secret,
    private readonly secretOrPublicKey: jwt.Secret,
    private readonly options: jwt.SignOptions
  ) {}

  public sign(payload: any, signOptions: jwt.SignOptions): string {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }

  public refresh(token: string, refreshOptions: any): string {
    const payload: any = jwt.verify(
      token,
      this.secretOrPublicKey,
      refreshOptions.verify
    );
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    const jwtSignOptions = Object.assign({}, this.options, {
      jwtid: refreshOptions.jwtid,
    });

    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
  }
}
