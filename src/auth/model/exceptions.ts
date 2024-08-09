import { CustomError } from "../../server/model";

export class CredentialsNotMatchError extends CustomError {}
export class InvalidLoginCredentials extends CustomError {}
