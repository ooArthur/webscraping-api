// Importação de Módulos:
// Importa as funções de scraping do Mercado Livre e da Amazon Brasil de seus respectivos arquivos de serviço.
const { scrapeMercadoLivre } = require('../services/scrapeMercadoLivre');
const { scrapeAmazonBrasil } = require('../services/scrapeAmazonBrasil');

// Função searchProducts:
// Esta função é responsável por lidar com a rota de busca de produtos.
// Ela recebe uma requisição (req) e uma resposta (res) como parâmetros.
async function searchProducts(req, res) {
    const query = req.query.q; // Obtém o parâmetro de consulta 'q' da requisição.

    // Verifica se o parâmetro de consulta está presente.
    // Se não estiver, retorna um erro com status 400 (Bad Request).
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        // Tenta fazer a raspagem de dados do Mercado Livre e da Amazon Brasil em paralelo.
        const [productsMercadoLivre, productsAmazonBrasil] = await Promise.all([
            scrapeMercadoLivre(query),
            scrapeAmazonBrasil(query),
        ]);

        // Retorna os resultados da busca como um array de produtos (um array contendo os resultados do Mercado Livre e da Amazon Brasil).
        res.json([productsMercadoLivre, productsAmazonBrasil]);
    } catch (error) {
        console.error(error); // Registra o erro no console para depuração.
        // Retorna um erro com status 500 (Internal Server Error) caso ocorra um erro durante a raspagem de dados.
        res.status(500).json({ error: 'An error occurred while scraping data' });
    }
}

// Exportação da Função:
// Exporta a função searchProducts para que ela possa ser usada em outros arquivos JavaScript, como uma rota de busca de produtos em uma aplicação Node.js.
module.exports = {
    searchProducts
};