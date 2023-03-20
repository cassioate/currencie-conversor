import axios, { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../data/protocols/axios/axios-instance";

export class AxiosAwesomeApi implements AxiosInstanceInterface {
  constructor(private readonly url: string) {}
  api = (token?: string): AxiosInstance => {
    return axios.create({
      baseURL: this.url,
      headers: {
        Authorization: token ? `Barer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  };
}
