export class InternalServerError extends Error {
  statusCode: number;
  constructor(stack: string, statusCode?: number) {
    super("Internal Server Error");
    this.name = "InternalServerError";
    this.stack = stack;
    this.statusCode = statusCode | 500;
  }
}
