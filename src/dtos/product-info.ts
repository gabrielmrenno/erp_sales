interface ICreateProductInfo {
  code?: number;
  name: string;
  description: string;
  group: string;
  unit: "FD" | "SC";
  unitPrice: number;
  weight: number;
}

interface IUpdateProductInfoDTO {
  name?: string;
  group?: string;
  unitPrice?: number;
}
