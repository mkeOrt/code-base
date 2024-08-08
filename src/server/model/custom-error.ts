export class CustomError extends Error {
  public errorDetails: unknown;

  constructor(message: string, errorDetails?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.errorDetails = errorDetails;
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      errorDetails: this.errorDetails,
    };
  }
}
