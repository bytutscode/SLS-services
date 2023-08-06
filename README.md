# SLS - services | Plataforma de Anúncios de Serviços

Bem-vindo à Plataforma de Anúncios de Serviços, uma aplicação web desenvolvida em Node.js e TypeScript que permite aos usuários publicarem e descobrirem uma variedade de serviços. A plataforma utiliza o banco de dados MySQL para armazenar as informações dos anúncios e fornece diversas funcionalidades para facilitar a experiência dos usuários.

## Recursos Principais

- **Autenticação e Segurança:** A aplicação oferece autenticação segura para os usuários, permitindo que eles acessem suas contas de forma protegida. Além disso, a recuperação de senha é possível através do envio de um link de redefinição por e-mail.

- **Publicação de Anúncios:** Os usuários podem criar e publicar anúncios de serviços, fornecendo detalhes sobre o que oferecem. Cada anúncio inclui um link direto para o WhatsApp do anunciante para facilitar o contato.

- **Visualização de Anúncios:** Os usuários têm a opção de explorar uma área geral com todos os serviços anunciados. Filtros de pesquisa permitem refinar os resultados por palavra-chave, estado ou cidade.

<<<<<<< HEAD
- **Área do Usuário:** Cada usuário tem uma área pessoal onde podem gerenciar seus anúncios publicados. Isso inclui a capacidade excluir seus serviços.
=======
- **Área do Usuário:** Cada usuário tem uma área pessoal onde podem gerenciar seus anúncios publicados. Isso inclui a capacidade de excluir seus serviços.


- **Aprovação de Anúncios pelo ADM:** Antes que um anúncio se torne público, os administradores têm a capacidade de aprovar ou rejeitar os serviços propostos, garantindo que apenas conteúdo relevante e apropriado seja exibido.

## Tecnologias Utilizadas

- Node.js e TypeScript para o desenvolvimento do backend.
- Banco de dados MySQL para armazenamento de dados.
- Validação de entrada para garantir dados corretos e seguros.
- Recursos de roteamento do Express.js para gerenciar as requisições.
- Envio de e-mails com o Nodemailer.
- Autenticação e geração de tokens JWT com o jsonwebtoken.
- Upload de arquivos com o Multer.
- Integração de CORS para permitir comunicação entre domínios.
- Integração de autenticação de cookies com o Cookie Parser.
- Validação de entrada com o Express Validator.
- Integração de templates Mustache com o Mustache Express.
- Consumo de APIs externas com o Axios.
- ORM para MySQL com o Sequelize.
- Configuração de variáveis de ambiente com o Dotenv.

## Pré-requisitos globais:


```bash
npm install -g nodemon typescript ts-node
```
## Instalação

instale todas as depedências.

```bash
npm install
```

## Como usar
Iniciar projeto
```javascript
npm test
```

## Importante
O projeto precisa ter seu ambiente configurado como:
```bash
*variáveis de ambiente do banco de dados MYSQL
*secretkey do jsonwebtoken
*variáveis de configurção do armazenamento das imagens
*variáveis de configurção do servidor SMTP
```

## Agreadecimento 

Obrigado por visitar meu projeto!

