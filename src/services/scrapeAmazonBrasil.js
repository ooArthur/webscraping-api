const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAmazonBrasil(query) {
    const url = `https://www.amazon.com.br/s?k=${query}`;
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

            $('div.s-result-item').each((index, element) => {
                const productTitle = $(element).find('h2.a-size-mini a.a-link-normal').text().trim();
                const productLink = 'https://www.amazon.com.br' + $(element).find('h2.a-size-mini a.a-link-normal').attr('href');
                const productPrice = $(element).find('span.a-price span.a-offscreen').first().text().trim();
                const productImage = $(element).find('img.s-image').attr('src');
                const reviewsCountText = $(element).find('span.a-size-base').text().trim();

                const match = reviewsCountText.match(/\d+/);
                let reviewsCount = match ? parseInt(match[0]) : 0;

                if (productTitle && productLink && productPrice && productImage) {
                    console.log("Produto Amazon:", {
                        title: productTitle,
                        link: productLink,
                        price: productPrice,
                        image: productImage,
                        reviewsCount: reviewsCount
                    });

                    products.push({
                        title: productTitle,
                        link: productLink,
                        price: productPrice,
                        image: productImage,
                        reviewsCount: reviewsCount
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
    scrapeAmazonBrasil
};
