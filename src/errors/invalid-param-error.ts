export class InvalidParamError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode?: number) {
    super(`Invalid param: ${msg}`);
    this.name = "InvalidParamError";
    this.statusCode = statusCode | 400;
  }
}
