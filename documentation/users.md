# Regras de negócio

## User

### Create a new user

**RF**
Deve ser possível criar um novo usuário.

**RN**
O usuário não pode ser criado com um nome e username e name já existente. x
O usuário deve ser criado com isAdmin como "false" por padrão. x
O usuário deve ser criado com resetPassword "true" por padrão. x
O usuário deve ser criado com password "mudar@123" por padrão. x
A senha do usuário deve ser criada com hash. x
Para se criar um usuário, deve-se ter um usuário com isAdmin como "true". x

### List users

**RF**
Deve ser possível listar todos os usuários ativos. x
Deve ser possível listar um usuário pelo seu id. x

**RN**
Caso o usuário não exista, deve ser retornado um erro. x
Deve ser admin para listar usuários. x

### Update user

**RF**
Deve ser possível atualizar um usuário (name e/ou role) pelo seu id. x
Deve ser possível o usuário alterar sua própria senha. x
Deve ser possível resetar a senha do usuário pelo seu id. x
Deve ser possível alterar o isAdmin do usuário pelo seu id. x

**RN**
Caso o usuário não exista, deve ser retornado um erro. x
Não deve ser possível alterar o nome do usuário para um nome já existente. x
O usuário poderá alterar sua própria senha, mas não poderá alterar a senha de outros usuários. // TODO
Deve ser admin para atualizar usuários. // TODO
Deve ser admin para resetar a senha de outros usuários. // TODO
Deve ser admin para alterar o isAdmin de outros usuários. // TODO

### Delete user

**RF**
Deve ser possível deletar um usuário pelo seu id, porém ele não será deletado do banco de dados, apenas será marcado como "deleted". x

**RN**
Caso o usuário não exista, deve ser retornado um erro. x
Deve ser admin para deletar usuários. // TODO
