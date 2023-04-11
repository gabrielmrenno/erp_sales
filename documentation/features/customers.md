# Regras de negócio

## Customer

### Create a new customer

**RF**

- [x] Deve ser possível criar um novo cliente.

**RN**

- [x] O cliente não pode ser criado com o "name", "fantasyName", "doc" e "code" já existente.
- [ ] Permissões: ADMIN e SELLER

### List customers

**RF**

- [x] Deve ser possível listar todos os clientes.
- [x] Deve ser possível listar um cliente pelo seu id.

**RN**

- [x] Deve ser possível listar todos os clientes ativos ou desativados.
- [x] Para listagem dos usuários, deve possuir uma paginação de 20 itens por página.
- [x] Deve ser possível filtrar a lista por "fantasyName", "code" ou "cpnj".
- [x] Caso o cliente não exista, deve ser retornado um erro.
- [ ] Permissões: ADMIN e SELLER

### Update customer

**RF**

- [x] Deve ser possível atualizar um cliente "name", "fantasyName", "doc", "address", "city", "zipCode", "phone", "email", "contactName", "discount", "paymentTerm" pelo seu "code".

**RN**

- [x] Caso o cliente não exista, deve ser retornado um erro.
- [x] Não deve ser possível alterar o "name" e "fantasyName" do cliente para um já existente.
- [ ] Permissões: ADMIN e SELLER

### Delete customer

**RF**

- [x] Deve ser possível deletar um cliente pelo seu "code", porém ele não será deletado do banco de dados, apenas será marcado como "active" = false.

**RN**

- [x] Caso o cliente não exista, deve ser retornado um erro.
- [ ] Permissões: ADMIN
