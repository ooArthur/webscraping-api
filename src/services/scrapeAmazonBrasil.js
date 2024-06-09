// Importação de Módulos:
// O Axios é um cliente HTTP baseado em Promises para fazer requisições.
// Ele é usado aqui para fazer solicitações HTTP para a página da Amazon Brasil.
const axios = require('axios');

// Cheerio é uma biblioteca que implementa uma API similar à do jQuery para análise e manipulação de documentos HTML.
// É utilizada neste código para analisar o HTML retornado pela solicitação HTTP e extrair os dados relevantes.
const cheerio = require('cheerio');

// Função scrapeAmazonBrasil:
// Esta função é assíncrona (async) porque faz solicitações HTTP e aguarda suas respostas.
// Ela aceita um parâmetro query, que é a string de pesquisa que será usada para buscar produtos na Amazon Brasil.
async function scrapeAmazonBrasil(query) {
    // Construção da URL de Busca:
    // Esta linha constrói a URL de busca na Amazon Brasil com base na query fornecida.
    const url = `https://www.amazon.com.br/s?k=${query}`;
    const maxRetries = 3; // Número máximo de tentativas em caso de falha na solicitação
    let attempts = 0; // Contador de tentativas

    // Loop de Tentativas:
    // Um loop while é utilizado para permitir um número máximo de tentativas (maxRetries) caso ocorra algum erro durante a solicitação HTTP.
    // Isso é útil para lidar com problemas temporários de conexão ou erros na resposta do servidor.
    // attempts é um contador que rastreia o número de tentativas já feitas.
    while (attempts < maxRetries) {
        try {
            // Solicitação HTTP com Axios:
            // Faz uma solicitação GET para a URL construída anteriormente.
            // O await é usado porque a solicitação é assíncrona e precisamos aguardar a resposta.
            // O objeto de opções passado para axios.get inclui cabeçalhos HTTP personalizados, como o User-Agent, que simula um navegador Chrome, e o Accept-Language, que define o idioma da resposta que queremos receber.
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br'
                }
            });
            const $ = cheerio.load(data); // Carrega o HTML retornado em um objeto Cheerio
            let products = []; // Array para armazenar os detalhes dos produtos

            // Análise do HTML com Cheerio:
            // Carrega o HTML retornado pela solicitação HTTP em um objeto Cheerio,
            // que permite buscar e manipular elementos do DOM como se estivesse usando jQuery.
            $('div.s-result-item').each((index, element) => {
                // Extração de Informações dos Produtos:
                // Itera sobre cada elemento HTML que possui a classe s-result-item, que corresponde aos resultados da pesquisa na página da Amazon.
                // Dentro do loop, são extraídas informações como título, link, preço, imagem e contagem de avaliações de cada produto usando métodos do Cheerio para encontrar os elementos correspondentes no HTML.
                const productTitle = $(element).find('h2.a-size-mini a.a-link-normal').text().trim();
                const productLink = 'https://www.amazon.com.br' + $(element).find('h2.a-size-mini a.a-link-normal').attr('href');
                const productPrice = $(element).find('span.a-price span.a-offscreen').first().text().trim();
                const productImage = $(element).find('img.s-image').attr('src');
                const reviewsCountText = $(element).find('span.a-size-base').text().trim();

                // Tratamento de Dados e Validação:
                // Os dados extraídos são tratados para garantir que todos os campos estejam preenchidos e válidos.
                // A contagem de avaliações é extraída usando uma expressão regular para encontrar números dentro da string de texto.
                // Se todas as informações necessárias estiverem presentes, o produto é adicionado a um array products.
                const match = reviewsCountText.match(/\d+/);
                let reviewsCount = match ? parseInt(match[0]) : 0;

                if (productTitle && productLink && productPrice && productImage) {
                    // Log para verificar os detalhes do produto
                    console.log("Produto Amazon:", {
                        title: productTitle,
                        link: productLink,
                        price: productPrice,
                        image: productImage,
                        reviewsCount: reviewsCount
                    });

                    // Adiciona os detalhes do produto ao array de produtos
                    products.push({
                        title: productTitle,
                        link: productLink,
                        price: productPrice,
                        image: productImage,
                        reviewsCount: reviewsCount
                    });
                }
            });

            // Retorno dos Produtos:
            // Retorna o array products contendo os detalhes dos produtos encontrados na busca.
            return products;

        } catch (error) {
            // Tratamento de Erros:
            // Se ocorrer um erro durante a solicitação HTTP, ele é capturado e tratado.
            // O código faz até maxRetries tentativas antes de desistir completamente.
            // Se todas as tentativas falharem, a função retorna um array vazio.
            attempts++;
            console.error(`Tentativa ${attempts} falhou: ${error.message}`);
            if (attempts >= maxRetries) {
                return [];
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos antes de tentar novamente
        }
    }
}

// Exportação da Função:
// Exporta a função scrapeAmazonBrasil para que ela possa ser usada em outros arquivos JavaScript.
module.exports = {
    scrapeAmazonBrasil
};
