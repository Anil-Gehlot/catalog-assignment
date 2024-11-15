import axios from 'axios';



// This is a helper function used to get the coin data from the coingecko api
export async function getCoinsData(days) {
    
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
            params: {
                vs_currency: 'usd',
                days: days,
                precision: 2
            },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
            }
        });
        // console.log(response)

        // extracting required data fron the response.
        const currentPrice = response.data.prices[response.data.prices.length - 1][1];
        const chosenDayPrice = response.data.prices[0][1];
        const priceDifference = currentPrice - chosenDayPrice;
        const percentageChange = ((priceDifference / chosenDayPrice) * 100).toFixed(2);

        return {
            currentPrice: currentPrice.toFixed(2),
            priceDifference: priceDifference.toFixed(2),
            percentageChange: percentageChange,
            sign: priceDifference >= 0 ? '+':'',
            prices: response.data.prices,
            volume: response.data.total_volumes
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}
