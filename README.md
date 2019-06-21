# AncapHub

## Como Funciona?
Existe um servidor central da aplicação criado com Express que disponibiliza um API Rest. O banco de dados utilizado está sendo MongoDB. O painel de controle, site e aplicativo são separados e consomem a mesma API.

## Estrutura
Estão sendo utilizados no projeto
- Node
- Express
- MongoDB
- React
- React Native
- Material-UI

## Como Rodar
Basta fazer um clone do repositório, entrar em todas as pastas na raíz(cada uma correspondente a uma aplicação diferente) e instalar as respectivas dependências.

Para rodar o servidor entre na pasta /server e utilize o comando `$ npm start`. Ele será executado na porta :3000

Para rodar o Painel Administrativo entre na pasta /admin e utilize o comando `$ npm run dev`. Ele será executado na porta :8080

Para rodar a Versão Web entre na pasta /web e utilize o comando `$ npm run dev`. Ela será executada na porta :8081

O aplicativo contém apenas a estrutura padrão do react-native, ele não será alterado no momento.
