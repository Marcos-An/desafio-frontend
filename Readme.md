# 🏁 Desafio de programação - Vaga Front-End 🏁

<a href="" target="_blank">
  <img src="/public/assets/images/banner.png" alt="banner">
</a> 
<br> 
<br>  

**Desafio** 🚀 🚀 🚀
 
O desafio foi poposto por [ByCoders](https://www.bycoders.co/) e consiste em criar um projeto do youtube, utilizando a [YouTube API](https://developers.google.com/youtube/v3).

Foi criado 3 páginas:
- Home, com os vídeos em alta no Brasil
- Página com o vídeo escolhido para assistir com os vídeos relacionados e comentários
- Página do canal com vídeos filtrados por data de postagem e informações do mesmo  


  <br/>
  
## Tecnologias utilizadas

- ⚡ [Next.js](https://nextjs.org) como framework principal
- 🔥 Desenvolvido com [TypeScript](https://www.typescriptlang.org)
- 📏 Linter Com [ESLint](https://eslint.org) (configuração STANDARD)
- 🌈 Code Formatter com [Prettier](https://prettier.io)
- 🗂 Absolute Imports usando `@` prefix (ALIAS configurado)
- 🤖 Teste automatizados com [Jest](https://jestjs.io/pt-BR/) e [Cypress](https://www.cypress.io/)
- ⚛ [Redux](https://redux.js.org/) para a gerencia de estados

<br/>
  
 ## Getting Started

Required Node.Js  ^14


**Antes de rodar o projeto**
1. Crie um projeto no [console de desenvolvedor](https://console.developers.google.com/projectcreate) da **Google**
2. Ative a [YouTube Data API v3](https://console.developers.google.com/apis/api/youtube.googleapis.com/overview) nele
3. Crie uma credencial de acesso para que seu app possa se comunicar com a API
 
 
 <br/>

**Executando o projeto**

- Crie um arquivo chamado `.env.local` apartir do arquivo `.env.example`
- Atribua a variavel `NEXT_PUBLIC_API_KEY` no arquivo  `.env.local` a chave que você gerou no [console de desenvolvedor](https://console.developers.google.com/projectcreate) 
- Execute o comando `yarn` ou `npm install` para instalar as dependencias
- Execute  o comando `yarn run dev` ou `npm run dev` para rodar o projeto


**Executando os testes**

Após toda a instalação de dependencias e configurado sua chave de API, você pode rodar os testes.
Aqui temos dois testes, o e2e com `cypress` e unitário com `Jest`


- Execute os testes do `cypess` com o comando `yarn run cypress` ou `npm run cypress`
- Execute os testes do `Jes` com o comando `yarn run jest` ou `npm run jest`



**Requisitos do desafio**

- [x] Fornecer um mecanismo para o usuário poder pesquisar vídeos
- [x] Possuir home page que exiba algum conteúdo interessante para uma plataforma de vídeos
- [x] Fornecer uma estrutura de gerência do estado da aplicação
- [x] Possuir histórico das buscas realizadas (persistir localmente)

**Requisitos extras** 

- [ ] Permitir cadastro de usuário / login através da API do YouTube + OAuth2
- [ ] Permitir upload de vídeo para a API do YouTube

****

## Pontos principais

- Clean code
- Conhecimento de boas práticas / design patterns
- Demonstração de boa gestão do estado do app

****

## Pontos extras
- Uso de frameworks / libs
- Testes
- Componetização do app
- Uso de linters
****
