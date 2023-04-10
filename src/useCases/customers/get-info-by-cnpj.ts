import axios, { AxiosError } from "axios";
import { AppError } from "../../errors/app-error";

interface GetInfoByCnpjResponse {
  name: string;
  fantasyName: string;
  doc: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export class GetInfoByCnpj {
  async execute(cnpj: string) {
    const getInfoByCnpjURL = `https://publica.cnpj.ws/cnpj/${cnpj}`;

    try {
      const response = await axios.get(getInfoByCnpjURL);

      const responseData = response.data;
      const address = `${responseData.estabelecimento.logradouro}, ${responseData.estabelecimento.numero}, ${responseData.estabelecimento.bairro}`;
      const customerInfos: GetInfoByCnpjResponse = {
        name: responseData.razao_social,
        fantasyName: responseData.estabelecimento.nome_fantasia,
        doc: cnpj,
        email: responseData.estabelecimento.email,
        phone: responseData.estabelecimento.telefone1,
        address,
        city: responseData.estabelecimento.cidade.nome,
        zipCode: responseData.estabelecimento.cep,
      };

      return customerInfos;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          throw new AppError("So many request", 429);
        }
        throw new AppError("Invalid CNPJ");
      }
      throw new AppError("Internal error", 500);
    }
  }
}
