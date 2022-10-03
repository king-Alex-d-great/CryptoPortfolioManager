"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Application = void 0;
const inquirer = __importStar(require("inquirer"));
const Models_1 = require("../Models");
class Application {
    constructor(controller) {
        this.availableTokens = [];
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            this.menuHandler();
        });
        this.mainMenu = () => {
            let choices = [
                Models_1.Choices.AllBalances,
                Models_1.Choices.OneBalance,
                Models_1.Choices.AllBalancesByDate,
                Models_1.Choices.OneBalanceByDate
            ];
            return inquirer
                .prompt([
                {
                    name: "MenuOption",
                    type: "list",
                    message: "Welcome to your portfolio manager\n\n",
                    choices
                }
            ]);
        };
        this.menuHandler = () => __awaiter(this, void 0, void 0, function* () {
            let option = yield this.mainMenu();
            let result;
            let choice;
            if (option.MenuOption == Models_1.Choices.OneBalance) {
                choice = Models_1.Choices.OneBalance;
                result = (yield this.controller.handleGetATokenBalance(this.availableTokens)).toString();
            }
            if (option.MenuOption == Models_1.Choices.AllBalances) {
                choice = Models_1.Choices.AllBalances;
                result = yield this.controller.handleGetAllTokenBalances();
            }
            if (option.MenuOption == Models_1.Choices.AllBalancesByDate) {
                choice = Models_1.Choices.AllBalancesByDate;
                result = yield this.controller.handleGetAllTokenBalancesOnDate();
            }
            if (option.MenuOption == Models_1.Choices.OneBalanceByDate) {
                choice = Models_1.Choices.OneBalanceByDate;
                result = (yield this.controller.handleGetATokenBalanceOnDate(this.availableTokens)).toString();
            }
            console.log(typeof (result), "TYPE");
            console.log(`Query: ${choice}\n`);
            if (typeof (result) == "string") {
                console.log(`Result: ${result}`);
            }
            else {
                console.log("Result:\n");
                result.forEach(x => console.log(x));
            }
            this.menuHandler();
        });
        this.controller = controller;
        this.availableTokens = this.controller.getAvailableTokens();
    }
}
exports.Application = Application;
