import axios, { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../data/protocols/axios/axios-instance-protocols";

export class AxiosAwesomeApi implements AxiosInstanceInterface {
  constructor(private readonly url: string) {}
  api = (): AxiosInstance => {
    return axios.create({
      baseURL: this.url,
    });
  };
}
