# Regras de negócio

## Orders

### Create a new order

**RF**

- [ ] Deve ser possível criar um novo pedido.
  - [ ] customerId, userId, items, dueDate

**RN**

- [ ] Permissões: ADMIN e SELLER

### List orders and a order

**RF**

- [ ] Deve ser possível listar todos os pedidos ou um específico a partir do código.

**RN**

- [ ] O dueDate deve ser igual ao dia deliveryDate + customer.paymentTerms;
- [ ] Deve-se calcular o valor e o peso total dos itens do pedido;
- [ ] Permissões: ADMIN e SELLER
