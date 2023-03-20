import { AxiosInstance } from "axios";

export interface AxiosInstanceInterface {
  api: (token?: string) => AxiosInstance;
}
