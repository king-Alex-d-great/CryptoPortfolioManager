"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const Models_1 = require("../../Models");
const csvRepository_1 = require("../../Repository/csvRepository");
class RequestService extends csvRepository_1.CsvHandler {
    constructor() {
        super();
        this.calculateTransactions = (transactions, transactionType) => {
            transactions = transactions.filter(x => x.transaction_type == transactionType);
            return transactions.reduce((sum, current) => sum + +current.amount, 0);
        };
        this.getTransactions = (token = null) => {
            const csvStore = RequestService.getCsvStore();
            if (token.trim().length === 0)
                return csvStore;
            return csvStore.filter((x) => x.token.toLowerCase() == token.toLowerCase());
        };
        this.getTransactionsByDate = (date) => {
            const csvStore = RequestService.getGroupedCsvStoreByDate();
            let transactions = csvStore.find(x => x.name == date.toDateString());
            return transactions;
        };
        this.getBalance = (token = null) => {
            try {
                const csvStore = RequestService.getGroupedCsvStore();
                if (token == null || token == "") {
                    return csvStore.map(x => ({ "name": x.name, "balance": x.balance }));
                }
                let transactiontype = csvStore.find((x) => x.name.toLowerCase() == token.toLowerCase());
                return transactiontype.balance;
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.getBalanceByDate = (date, token = "") => {
            try {
                let csvStore = this.getTransactionsByDate(date);
                let availableTokens = RequestService.getTokenTypes();
                let transactions = csvStore.transactions;
                if (token.length > 0) {
                    transactions = csvStore.transactions.filter(x => x.token.toLowerCase() == token.toLowerCase());
                    const deposits = this.calculateTransactions(transactions, Models_1.TransactionType.deposit);
                    const withdrawals = this.calculateTransactions(transactions, Models_1.TransactionType.withdrawal);
                    return deposits - withdrawals;
                }
                return availableTokens.map(tkn => {
                    transactions = csvStore.transactions.filter(x => x.token.toLowerCase() == tkn.toLowerCase());
                    const deposits = this.calculateTransactions(transactions, Models_1.TransactionType.deposit);
                    const withdrawals = this.calculateTransactions(transactions, Models_1.TransactionType.withdrawal);
                    return { "name": tkn, "balance": (deposits - withdrawals) };
                });
            }
            catch (err) {
                console.log(err.message);
            }
        };
        this.getAvailableTokens = () => {
            return RequestService.getTokenTypes();
        };
        RequestService.getCsvStore();
    }
}
exports.RequestService = RequestService;
