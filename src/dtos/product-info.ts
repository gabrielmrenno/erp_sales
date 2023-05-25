interface ICreateProductInfo {
  code?: number;
  name: string;
  description: string;
  group: string;
  unit: "FD" | "SC";
  price: number;
  weight: number;
}

interface IUpdateProductInfoDTO {
  name?: string;
  group?: string;
  price?: number;
  weight?: number;
  description?: string;
  unit?: "FD" | "SC";
}
