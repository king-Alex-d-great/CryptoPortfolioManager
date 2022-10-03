"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHistoricalDataEndpoint = exports.generateCurrentDataEndpoint = void 0;
const axios = require("axios");
require("dotenv").config();
function generateCurrentDataEndpoint(availableTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseEndPoint = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${availableTokens}&tsyms=USD&api_key=${process.env.api_key}`;
        let response = yield axios.get(baseEndPoint);
        return response.data;
    });
}
exports.generateCurrentDataEndpoint = generateCurrentDataEndpoint;
function generateHistoricalDataEndpoint(timestamp, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseEndPoint = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${token.toUpperCase()}&tsyms=USD&ts=${timestamp}&api_key=${process.env.api_key}`;
        let response = yield axios.get(baseEndPoint);
        return response.data;
    });
}
exports.generateHistoricalDataEndpoint = generateHistoricalDataEndpoint;
