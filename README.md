# Regras de negócio

### Create a new user

**RF**
Deve ser possível criar um novo usuário.

**RN**
O usuário não pode ser criado com um nome e username já existente. x
O usuário deve ser criado com isAdmin como "false" por padrão. x
A senha do usuário deve ser criada com hash. x
Para se criar um usuário, deve-se ter um usuário com isAdmin como "true". // TODO

### List users

**RF**
Deve ser possível listar todos os usuários. x
Deve ser possível listar um usuário pelo seu id. x   

**RN**
Caso o usuário não exista, deve ser retornado um erro. x
Deve ser admin para listar usuários. // TODO