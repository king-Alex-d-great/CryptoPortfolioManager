const axios = require("axios")
require("dotenv").config();

export async function generateCurrentDataEndpoint (availableTokens) {
    const baseEndPoint =
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${availableTokens}&tsyms=USD&api_key=${process.env.api_key}`;

      let response = await axios.get(baseEndPoint);
      return response.data;
}

export async function generateHistoricalDataEndpoint(timestamp, token : string) {
  
  const baseEndPoint =
    `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${token.toUpperCase()}&tsyms=USD&ts=${timestamp}&api_key=${process.env.api_key}`;

    let response = await axios.get(baseEndPoint);
    return response.data;
}
