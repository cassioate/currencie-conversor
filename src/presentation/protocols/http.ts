export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest<T = any> {
  params?: T;
  headers?: any;
  body?: any;
  query?: QueryParams;
}

export interface ConvertParams {
  currency?: string;
  value?: number;
}

export interface QueryParams {
  page?: number;
  size?: number;
}
