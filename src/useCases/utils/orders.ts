import { OrderedProducts, ProductInfo } from "@prisma/client";

export function calculateTotalsOnOrder(
  items: OrderedProducts[],
  productsInfo: ProductInfo[]
) {
  let totalValue = 0;
  let totalWeight = 0;

  for (const orderedProduct of items) {
    const productInfo = productsInfo.find(
      (p) => p.code === orderedProduct.productInfoCode
    );

    if (productInfo) {
      totalValue += productInfo.price.toNumber() * orderedProduct.amount;
      totalWeight += productInfo.weight.toNumber() * orderedProduct.amount;
    }
  }

  return { totalValue, totalWeight };
}
