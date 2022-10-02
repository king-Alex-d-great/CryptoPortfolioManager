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
const Utilities_1 = require("../Utilities");
class Controller {
    constructor(requestService) {
        this.handleGetATokenBalance = (availableTokens) => __awaiter(this, void 0, void 0, function* () {
            let tokenType = yield this.utils.getTokenType(availableTokens);
            return this.csvService.getBalance(tokenType);
        });
        this.handleGetAllTokenBalances = () => {
            return this.csvService.getBalance("");
        };
        this.handleGetAllTokenBalancesOnDate = () => __awaiter(this, void 0, void 0, function* () {
            let date = this.utils.getDate();
            return this.csvService.getBalanceByDate(yield date, "");
        });
        this.handleGetATokenBalanceOnDate = (availableTokens) => __awaiter(this, void 0, void 0, function* () {
            let date = this.utils.getDate();
            let tokenType = this.utils.getTokenType(availableTokens);
            return this.csvService.getBalanceByDate(yield date, yield tokenType);
        });
        this.csvService = requestService;
        this.utils = new Utilities_1.Utils();
    }
}
exports.Controller = Controller;
