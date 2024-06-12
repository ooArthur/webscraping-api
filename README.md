![Logo](https://brandslogos.com/wp-content/uploads/images/large/nodejs-logo.png)

# WebScraping API | Node.js

Este projeto é um exercício de treino onde tentei desenvolver uma API de web scraping em Node.js, o objetivo deste exercício foi buscar produtos no Mercado Livre e na Amazon Brasil, além de ter meu primeiro contato com a biblioteca cheerio que usarei em projetos futuros. Estou utilizando as bibliotecas Axios e Cheerio para fazer solicitações HTTP e analisar o HTML das páginas, respectivamente.

## Funcionalidades

- Busca de produtos por meio de uma única consulta
- Raspagem de dados de produtos encontrados no Mercado Livre e na Amazon Brasil
- Tratamento de erros durante o processo de raspagem de dados

## Instalação

1. Clone o repositório para sua máquina local:
```bash
   git clone https://github.com/Ath3Dev/webscraping-api.git
```

2. Navegue até o diretório do projeto:
```bash
    cd webscraping-api
```

3. Instale as dependências do projeto:
```bash
    npm i
```

## Uso da API
Para buscar produtos, siga estes passos:

1. Inicie o servidor:
```bash
    npm start
```

2. Faça uma solicitação GET para a rota /api/products/search, fornecendo o parâmetro de consulta q com o termo de pesquisa desejado. Por exemplo:
```http
GET http://localhost:3000/api/products/search?q=iphone
```

3. Você receberá uma resposta JSON contendo os produtos encontrados no Mercado Livre e na Amazon Brasil, também será exibido no console da sua IDE.

### Configuração
Para modificar o número máximo de tentativas de solicitação ou ajustar outros parâmetros, você pode editar os arquivos de serviço scrapeMercadoLivre.js e scrapeAmazonBrasil.js.

### Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar problemas ou propor novas funcionalidades. Você também pode enviar um pull request com suas melhorias.
