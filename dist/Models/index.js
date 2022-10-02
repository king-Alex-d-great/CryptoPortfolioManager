"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.Choices = void 0;
var Choices;
(function (Choices) {
    Choices["AllBalances"] = "View portfolio value for all tokens in your wallet";
    Choices["OneBalance"] = "View portfolio value for any token in your wallet";
    Choices["AllBalancesByDate"] = "View portfolio value for all tokens in your wallet on a particular date";
    Choices["OneBalanceByDate"] = "View portfolio value for any token in your wallet on a particular date";
})(Choices = exports.Choices || (exports.Choices = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["withdrawal"] = "WITHDRAWAL";
    TransactionType["deposit"] = "DEPOSIT";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
