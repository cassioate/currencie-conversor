export class BadRequestError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode?: number) {
    super(`BadRequest: ${msg}`);
    this.name = "BadRequestError";
    this.statusCode = statusCode | 400;
  }
}
