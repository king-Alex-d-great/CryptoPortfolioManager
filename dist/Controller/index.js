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
exports.Controller = void 0;
const priceConverter_1 = require("../Utilities/priceConverter");
class Controller {
    constructor(requestService, utils) {
        this.handleGetATokenBalance = (availableTokens) => __awaiter(this, void 0, void 0, function* () {
            let tokenType = yield this.utils.getTokenType(availableTokens);
            let result = this.csvService.getBalance(tokenType);
            let availabletokens = this.getAvailableTokens();
            let usdBalances = yield (0, priceConverter_1.generateCurrentDataEndpoint)(availabletokens.toString());
            for (let i in usdBalances) {
                if (i.toLowerCase() == tokenType.toLowerCase())
                    result *= (+usdBalances[i].USD);
            }
            return result;
        });
        this.handleGetAllTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            let result = this.csvService.getBalance("");
            let availabletokens = this.getAvailableTokens();
            let usdBalances = yield (0, priceConverter_1.generateCurrentDataEndpoint)(availabletokens.toString());
            return result.map(x => {
                for (let i in usdBalances) {
                    if (i.toLowerCase() == x.name.toLowerCase())
                        x.balance *= (+usdBalances[i].USD);
                }
                return x;
            });
        });
        this.handleGetAllTokenBalancesOnDate = () => __awaiter(this, void 0, void 0, function* () {
            let date = yield this.utils.getDate();
            let result = this.csvService.getBalanceByDate(date, "");
            const unixTime = Math.floor(date.getTime() / 1000);
            result = result.map((x) => __awaiter(this, void 0, void 0, function* () {
                let usdBalances = yield (0, priceConverter_1.generateHistoricalDataEndpoint)(unixTime, x.name);
                for (let i in usdBalances) {
                    x.balance *= (+usdBalances[i].USD);
                }
                return x;
            }));
            result = yield Promise.all(result).then((values) => values);
            return result;
        });
        this.handleGetATokenBalanceOnDate = (availableTokens) => __awaiter(this, void 0, void 0, function* () {
            let date = yield this.utils.getDate();
            let tokenType = yield this.utils.getTokenType(availableTokens);
            let result = this.csvService.getBalanceByDate(date, tokenType);
            const unixTime = Math.floor(date.getTime() / 1000);
            let usdBalances = yield (0, priceConverter_1.generateHistoricalDataEndpoint)(unixTime, tokenType);
            for (let i in usdBalances) {
                result *= (+usdBalances[i].USD);
            }
            return result;
        });
        this.getAvailableTokens = () => {
            return this.csvService.getAvailableTokens();
        };
        this.csvService = requestService;
        this.utils = utils;
    }
}
exports.Controller = Controller;
