import { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../../src/data/protocols/axios/axios-instance-protocols";
import { AxiosAwesomeApi } from "../../../src/infra/axios/awesome-api";
import { makeAxiosInstanceStub } from "../mock/axios-instance.mock";

jest.mock("axios", () => ({
  create(): AxiosInstance {
    return makeAxiosInstanceStub;
  },
}));

interface SutType {
  sut: AxiosInstanceInterface;
}

const makeSut = (): SutType => {
  const sut = new AxiosAwesomeApi("pathURL");
  return {
    sut,
  };
};

describe("GIVEN AxiosAwesomeApi", () => {
  describe("WHEN api is called", () => {
    test("THEN should return axiosInstance", async () => {
      const { sut } = makeSut();
      const result = sut.api();
      expect(result).toEqual(makeAxiosInstanceStub);
    });
  });
});
