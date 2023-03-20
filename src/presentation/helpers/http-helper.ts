import { HttpResponse } from "../protocols";

export const httpError = (error: Error, statusCode?: number): HttpResponse => ({
  statusCode: statusCode ? statusCode : 500,
  body: {
    name: error.name,
    message: error.message,
    stack: error.stack,
  },
});

export const httpOk = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
