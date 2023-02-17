# Regras de negócio

## Product

### Create a new product

**RF**
Deve ser possível criar um novo produto.

**RN**
O produto não pode ser criado com o name já existente. x
Para se criar um produto, deve-se ter um produto com isAdmin como "true". TODO

### List products

**RF**
Deve ser possível listar todos os produtos ativos. x
Deve ser possível listar um produto pelo seu id. x

**RN**
Caso o produto não exista, deve ser retornado um erro. x
Deve ser admin para listar usuários. TODO

### Update product

**RF**
Deve ser possível atualizar um produto name, group, unitPrice pelo seu id. x
Deve ser possível atualizar o unitPrice do produto pelo seu id.
Permissões: TODO

**RN**
Caso o produto não exista, deve ser retornado um erro. x
Não deve ser possível alterar o name do produto para um name já existente. x
Permissões: TODO

### Delete product

**RF**
Deve ser possível deletar um produto pelo seu id, porém ele não será deletado do banco de dados, apenas será marcado como "deleted". x

**RN**
Caso o produto não exista, deve ser retornado um erro. x
Permissões: TODO
