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
exports.Utils = void 0;
const inquirer = __importStar(require("inquirer"));
class Utils {
    constructor() {
        this.getTokenType = (availableTokens) => __awaiter(this, void 0, void 0, function* () {
            let isValidResponse = false;
            availableTokens = availableTokens.map(x => x.toLowerCase());
            let Option = "";
            while (!isValidResponse) {
                let result = (yield this.getCollector(`Enter a valid token option\nAvailable option ${availableTokens !== null && availableTokens !== void 0 ? availableTokens : "None"}`));
                if (availableTokens.includes(result.Option.toLowerCase())) {
                    isValidResponse = true;
                    Option = result.Option;
                }
                else {
                    console.log("Invalid Option!");
                }
            }
            return Option;
        });
        this.getDate = () => __awaiter(this, void 0, void 0, function* () {
            let isValidResponse = false;
            let requestDate;
            while (!isValidResponse) {
                let userInput = yield this.getCollector(`\nPlease Enter a Valid Date\nTip: 2020-12-21\n`);
                requestDate = new Date(userInput.Option);
                if (this.isDateValid(requestDate)) {
                    isValidResponse = true;
                }
                else {
                    console.log("Invalid Date!");
                }
            }
            return requestDate;
        });
        this.getCollector = (question) => {
            return inquirer
                .prompt([
                {
                    name: "Option",
                    type: "input",
                    message: `${question}\n\n`
                }
            ]);
        };
    }
    isDateValid(date) {
        return date instanceof Date && !isNaN(+date);
    }
}
exports.Utils = Utils;
