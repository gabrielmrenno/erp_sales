# Regras de negócio

## Customer

### Create a new customer

**RF**
Deve ser possível criar um novo cliente.

**RN**
O cliente não pode ser criado com o name, fantasyName e doc já existente. x
Permissões: TODO

### List customers

**RF**
Deve ser possível listar todos os clientes ativos. x
Deve ser possível listar um cliente pelo seu id. x

**RN**
Caso o cliente não exista, deve ser retornado um erro. x
Permissões: TODO

### Update customer

**RF**
Deve ser possível atualizar um cliente name, fantasyName, doc, address, city, zipCode, phone, email, contactName, discount, paymentTerm pelo seu id. x

**RN**
Caso o cliente não exista, deve ser retornado um erro. x
Não deve ser possível alterar o name do cliente para um name já existente. x
Permissões: TODO

### Delete customer

**RF**
Deve ser possível deletar um cliente pelo seu id, porém ele não será deletado do banco de dados, apenas será marcado como "active" = false. x

**RN**
Caso o cliente não exista, deve ser retornado um erro. x
Permissões: TODO
