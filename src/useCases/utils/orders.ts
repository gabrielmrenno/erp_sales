import { OrderedProducts, ProductInfo } from "@prisma/client";

export function calculateTotalsOnOrderedProduct(items: OrderedProducts[]) {
  let totalValue = 0;
  let totalWeight = 0;

  for (const orderedProduct of items) {
    totalValue +=
      orderedProduct.productPrice.toNumber() * orderedProduct.amount;
    totalWeight +=
      orderedProduct.productWeight.toNumber() * orderedProduct.amount;
  }

  return { totalValue, totalWeight };
}
