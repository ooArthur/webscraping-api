const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeMercadoLivre(query) {
    const url = `https://lista.mercadolivre.com.br/${query}`;
    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br'
                }
            });
            const $ = cheerio.load(data);
            let products = [];

            $('li.ui-search-layout__item').each((index, element) => {
                const productTitle = $(element).find('.ui-search-item__title').text().trim();
                const productLink = $(element).find('.ui-search-link').attr('href');
                const priceFraction = $(element).find('.andes-money-amount__fraction').first().text().trim();
                const priceCents = $(element).find('.andes-money-amount__cents').first().text().trim();
                const productImage = $(element).find('.ui-search-result__image img').attr('data-src') || $(element).find('.ui-search-result__image img').attr('src');
                const reviewsCountText = $(element).find('.ui-search-reviews__amount').first().text().trim();

                const productPrice = priceCents ? `${priceFraction},${priceCents}` : priceFraction;

                const match = reviewsCountText.match(/\d+/);
                let reviewsCount = match ? parseInt(match[0]) : 0;

                if (productTitle && productLink && productPrice && productImage) {
                    console.log("Produto Mercado Livre:", {
                        title: productTitle,
                        link: productLink,
                        price: productPrice,
                        image: productImage,
                        reviewsCount: reviewsCount
                    });

                    products.push({
                        title: productTitle,
                        link: productLink,
                        price: parseFloat(productPrice.replace(',', '.')),
                        image: productImage,
                        reviewsCount: parseInt(reviewsCountText.replace(/\D/g, '')) 
                    });
                }
            });

            return products;

        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed: ${error.message}`);
            if (attempts >= maxRetries) {
                return [];
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

module.exports = {
    scrapeMercadoLivre
};
