interface ICreateProduct {
  name: string;
  group: string;
  unitPrice: number;
}

interface IUpdateProductDTO {
  name?: string;
  group?: string;
  unitPrice?: number;
}
