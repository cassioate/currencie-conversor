export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest<T = any> {
  params?: T;
  headers?: any;
  body?: any;
}

export interface ConvertParams {
  currency?: any;
  value?: any;
}
