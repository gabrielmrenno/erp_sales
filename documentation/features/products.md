# Regras de negócio

## Product Info

### Create a new product

**RF**

- [x] Deve ser possível criar um novo produto.
  - code, name, description, group, unit, price, weight

**RN**

- [x] O produto não pode ser criado com o "name" já existente.
- [ ] Para se criar um produto, deve-se ter um produto com isAdmin como "true". TODO

### List products

**RF**

- [x] Deve ser possível listar todos os produtos ativos.
- [x] Deve ser possível listar um produto pelo seu id.

**RN**

- [x] Caso o produto não exista, deve ser retornado um erro.

### Update product

**RF**

- [x] Deve ser possível atualizar um produto name, group, price pelo seu id.
- [ ] Deve ser possível atualizar o price do produto pelo seu id.
- [ ] Permissões: TODO

**RN**

- [x] Caso o produto não exista, deve ser retornado um erro.
- [x] Não deve ser possível alterar o name do produto para um name já existente.
- [ ] Permissões: TODO

### Delete product

**RF**

- [x] Deve ser possível deletar um produto pelo seu id, porém ele não será deletado do banco de dados, apenas será marcado como "deleted".

**RN**

- [x] Caso o produto não exista, deve ser retornado um erro.
- [ ] Permissões: TODO
