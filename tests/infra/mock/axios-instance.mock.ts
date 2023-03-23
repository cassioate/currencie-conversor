import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const makeAxiosInstanceStub: AxiosInstance = {
  getUri(config?: AxiosRequestConfig<any>): string {
    throw new Error("Method not implemented.");
  },
  request<T = any, R = AxiosResponse<T, any>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return {} as any;
  },
  delete<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  head<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  options<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  post<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  put<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  patch<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  postForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  putForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
  patchForm<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    throw new Error("Method not implemented.");
  },
} as AxiosInstance;
