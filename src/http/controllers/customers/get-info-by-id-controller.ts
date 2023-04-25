import { Request, Response } from "express";
import { GetInfoByCnpj } from "../../../useCases/customers/get-info-by-cnpj";

export async function getInfoByCNPJCustomer(
  request: Request,
  response: Response
) {
  const getInfoByCnpjUseCase = new GetInfoByCnpj();

  const { doc } = request.params;

  const data = await getInfoByCnpjUseCase.execute(doc);

  return response.status(200).json({
    message: "Customer info returned successfully",
    data,
  });
}
