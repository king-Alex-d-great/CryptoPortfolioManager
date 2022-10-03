"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvHandler = void 0;
const Models_1 = require("../Models");
const fs = require("fs");
const { parse } = require("csv-parse");
class CsvHandler {
    static setCsvStore() {
        fs.createReadStream("./transactions.csv")
            .pipe(parse({
            delimiter: ",",
            columns: true,
            ltrim: true,
        }))
            .on("data", (row) => this.handleCsvTransaction(row))
            .on("error", function (error) {
            console.log(error.message);
        })
            .on("end", function () {
            // 👇 log the result array                
            console.log("parsed csv data:");
        });
    }
}
exports.CsvHandler = CsvHandler;
_a = CsvHandler;
CsvHandler.csvStore = [];
CsvHandler.csvStoreGroupedByTokenType = [];
CsvHandler.csvStoreGroupedByDate = [];
CsvHandler.tokenTypes = [];
CsvHandler.handleCsvTransaction = (row) => {
    try {
        row = row;
        _a.csvStore.push(row);
        let rowDate = new Date(+row.timestamp * 1000).toDateString();
        //Get token store
        let store = _a.csvStoreGroupedByTokenType.find(x => x.name === row.token);
        //if store does not exist create a new store
        if (store === undefined) {
            let newStore = {
                name: row.token,
                balance: 0,
                transactions: []
            };
            _a.csvStoreGroupedByTokenType.push(newStore);
            _a.tokenTypes.push(row.token);
            store = _a.csvStoreGroupedByTokenType.find(x => x.name === row.token);
        }
        let storeByDate = _a.csvStoreGroupedByDate.find(x => x.name === rowDate);
        //if store separated by time does not exist create a new store
        if (storeByDate === undefined) {
            let newStore = {
                name: rowDate,
                balance: 0,
                transactions: []
            };
            _a.csvStoreGroupedByDate.push(newStore);
            storeByDate = _a.csvStoreGroupedByDate.find(x => x.name === rowDate);
        }
        store.transactions.push(row);
        storeByDate.transactions.push(row);
        //update store balances depending on transaction type
        row.transaction_type == Models_1.TransactionType.deposit ?
            (store.balance += +row.amount, storeByDate.balance += +row.amount) :
            row.transaction_type == Models_1.TransactionType.withdrawal ?
                (store.balance -= +row.amount, storeByDate.balance -= +row.amount) : "";
    }
    catch (err) {
        throw err;
    }
};
CsvHandler.getCsvStore = () => {
    try {
        if (_a.csvStore.length > 0)
            return _a.csvStore;
        _a.setCsvStore();
        return _a.csvStore;
    }
    catch (err) {
        console.log(err.message);
    }
};
CsvHandler.getGroupedCsvStore = () => {
    try {
        if (_a.csvStoreGroupedByTokenType.length > 0)
            return _a.csvStoreGroupedByTokenType;
        _a.setCsvStore();
        return _a.csvStoreGroupedByTokenType;
    }
    catch (err) {
        console.log(err.message);
    }
};
CsvHandler.getGroupedCsvStoreByDate = () => {
    try {
        if (_a.csvStoreGroupedByDate.length > 0)
            return _a.csvStoreGroupedByDate;
        _a.setCsvStore();
        return _a.csvStoreGroupedByDate;
    }
    catch (err) {
        console.log(err.message);
    }
};
CsvHandler.getTokenTypes = () => {
    try {
        if (_a.tokenTypes.length > 0)
            return _a.tokenTypes;
        _a.setCsvStore();
        return _a.tokenTypes;
    }
    catch (err) {
        console.log(err.message);
    }
};
