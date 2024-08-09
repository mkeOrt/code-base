export interface TokenGenerator {
  sign(payload: any, signOptions: any): string;
  refresh(token: string, refreshOptions: any): string;
}
