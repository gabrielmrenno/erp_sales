import { Order } from "@prisma/client";
import { prisma } from "../../database/prisma-client";
import {
  GetOrderResponse,
  IFetchAllOrderParams,
  IOrdersRepository,
  InOrder,
  PopulateOrderItemsParams,
} from "../orders-repository-interface";
import { MissingProductsRepository } from "./missing-products-repository";
import { OrderedProductsRepository } from "./ordered-products-repository";
import { ProductsRepository } from "./products-repository";
interface ICreateOrderParams {
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export class OrdersRepository implements IOrdersRepository {
  async create(newOrderData: ICreateOrderParams): Promise<Order> {
    const newOrder = await prisma.order.create({
      data: {
        active: true,
        paymentStatus: "pendent",
        customer: {
          connect: {
            code: newOrderData.customerCode,
          },
        },
        user: {
          connect: {
            id: newOrderData.userId,
          },
        },
      },
      include: {
        OrderedProducts: true,
      },
    });

    return newOrder;
  }

  async fetchAll({
    page = 1,
    code,
    initialInterval,
    finalInterval,
  }: IFetchAllOrderParams): Promise<InOrder[]> {
    const orders = await prisma.order.findMany({
      where: {
        id: {
          equals: code,
        },
        createdAt: {
          gte: initialInterval,
          lte: finalInterval,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        OrderedProducts: true,
        customer: true,
      },
    });

    const ordersToBeReturn: InOrder[] = orders.map((order) => ({
      ...order,
    }));

    return ordersToBeReturn;
  }

  async getById(id: number): Promise<GetOrderResponse | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderedProducts: {
          include: {
            Product: true,
          },
        },
        MissingProducts: true,
        customer: true,
        user: true,
      },
    });

    return order;
  }

  async update(updatedOrder: Order): Promise<void> {
    await prisma.order.update({
      where: {
        id: updatedOrder.id,
      },
      data: updatedOrder,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async populateOrderItems({
    items,
    orderId,
  }: PopulateOrderItemsParams): Promise<void> {
    const orderedProductsRepository = new OrderedProductsRepository();
    const productsRepository = new ProductsRepository();
    const missingProductsRepository = new MissingProductsRepository();

    // get list of available Products on stock -> replace products
    const productsIStock =
      await productsRepository.listProductsGroupedByProductInfo();

    // for each product on items, verify if it has products available on Products
    items.forEach(async (item) => {
      const productIStock = productsIStock.find(
        (productIStock) => productIStock.code === item.productInfoCode
      );

      // it will consume all products available on stock
      let amountRemaining = item.amount;
      let currentProductAmountInStock = productIStock?.total!;

      while (amountRemaining > 0 && currentProductAmountInStock > 0) {
        const currentProduct =
          await productsRepository.getOldestProductWithAmount(
            productIStock?.code!
          );

        const amountToDecrease = Math.min(
          currentProduct?.amount!,
          amountRemaining
        );

        await orderedProductsRepository.create({
          amount: amountToDecrease,
          orderId: orderId,
          productId: currentProduct?.id!,
          productPrice: productIStock!.price,
          productWeight: productIStock!.weight,
        });

        amountRemaining -= amountToDecrease;
        currentProductAmountInStock -= amountToDecrease;
      }

      if (amountRemaining > 0) {
        //if there is amount of product to be took, create an MissingProduct
        await missingProductsRepository.create({
          amount: amountRemaining,
          orderId: orderId,
          productInfoCode: productIStock?.code!,
        });
      }
    });
  }
}
