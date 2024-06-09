const { scrapeMercadoLivre } = require('../services/scrapeMercadoLivre');
const { scrapeAmazonBrasil } = require('../services/scrapeAmazonBrasil');

async function searchProducts(req, res) {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const [productsMercadoLivre, productsAmazonBrasil] = await Promise.all([
            scrapeMercadoLivre(query),
            scrapeAmazonBrasil(query),
        ]);

        res.json([productsMercadoLivre, productsAmazonBrasil]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping data' });
    }
};


module.exports = {
    searchProducts
};
