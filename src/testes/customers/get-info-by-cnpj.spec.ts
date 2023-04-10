import { beforeEach, describe, expect, it, test } from "vitest";
import { GetInfoByCnpj } from "../../useCases/customers/get-info-by-cnpj";
import { AppError } from "../../errors/app-error";

let getInfoByCnpj: GetInfoByCnpj;

describe("Get info by CNPJ using external API", () => {
  beforeEach(() => {
    getInfoByCnpj = new GetInfoByCnpj();
  });
  it("should be able get customer info by cnpj", async () => {
    const validCnpj = "47811671000104";

    const data = await getInfoByCnpj.execute(validCnpj);

    console.log(data);
  });

  it("throw an error of invalid cnpj", async () => {
    const invalidCNPJ = "123456789";

    await expect(() =>
      getInfoByCnpj.execute(invalidCNPJ)
    ).rejects.toBeInstanceOf(AppError);
  });
});
