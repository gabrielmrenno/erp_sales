# Regras de negócio

### Create a new user

**RF**
Deve ser possível criar um novo usuário.

**RN**
O usuário não pode ser criado com um nome e username e name já existente. x
O usuário deve ser criado com isAdmin como "false" por padrão. x
O usuário deve ser criado com resetPassword "true" por padrão. 
O usuário deve ser criado com password "mudar@123" por padrão. 
A senha do usuário deve ser criada com hash. x
Para se criar um usuário, deve-se ter um usuário com isAdmin como "true". // TODO

### List users

**RF**
Deve ser possível listar todos os usuários. x
Deve ser possível listar um usuário pelo seu id. x   

**RN**
Caso o usuário não exista, deve ser retornado um erro. x
Deve ser admin para listar usuários. // TODO

### Update user

**RF**
Deve ser possível atualizar um usuário (name e/ou role) pelo seu id.
Deve ser possível resetar a senha do usuário pelo seu id.
Deve ser possível alterar o isAdmin do usuário pelo seu id.

**RN**
Caso o usuário não exista, deve ser retornado um erro.
Deve ser admin para atualizar usuários.
Deve ser admin para alterar a senha de outros usuários.
Deve ser admin para alterar o isAdmin de outros usuários.