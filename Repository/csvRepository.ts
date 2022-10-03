import { Transaction, TransactionStore, TransactionType } from "../Models";

const fs = require("fs");
const { parse } = require("csv-parse");

export abstract class CsvHandler {
    protected static csvStore: Transaction[] = [];
    protected static csvStoreGroupedByTokenType: TransactionStore[] = [];
    protected static csvStoreGroupedByDate: TransactionStore[] = [];
    protected static tokenTypes: string[] = [];

    protected static setCsvStore() {
        fs.createReadStream("./transactions.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    ltrim: true,
                })
            )
            .on("data", (row: Transaction) => this.handleCsvTransaction(row))
            .on("error", function (error: Error) {
                console.log(error.message);
            })
            .on("end", function () {
                // 👇 log the result array                
                console.log("parsed csv data:");
            });
    }

    protected static handleCsvTransaction = (row: Transaction) => {
        try {
            row = row as Transaction;
            this.csvStore.push(row);

            let rowDate = new Date(+row.timestamp * 1000).toDateString();
            //Get token store
            let store = this.csvStoreGroupedByTokenType.find(x => x.name === row.token);

            //if store does not exist create a new store
            if (store === undefined) {
                let newStore: TransactionStore = {
                    name: row.token,
                    balance: 0,
                    transactions: []
                }
                this.csvStoreGroupedByTokenType.push(newStore);
                this.tokenTypes.push(row.token);
                store = this.csvStoreGroupedByTokenType.find(x => x.name === row.token);
            }

            let storeByDate = this.csvStoreGroupedByDate.find(x => x.name === rowDate)
            //if store separated by time does not exist create a new store
            if (storeByDate === undefined) {
                let newStore: TransactionStore = {
                    name: rowDate,
                    balance: 0,
                    transactions: []
                }
                this.csvStoreGroupedByDate.push(newStore);
                storeByDate = this.csvStoreGroupedByDate.find(x => x.name === rowDate);
            }

            store.transactions.push(row);
            storeByDate.transactions.push(row);

            //update store balances depending on transaction type
            row.transaction_type as TransactionType == TransactionType.deposit ?
                (store.balance += +row.amount, storeByDate.balance += +row.amount) :
                row.transaction_type as TransactionType == TransactionType.withdrawal ?
                    (store.balance -= +row.amount, storeByDate.balance -= +row.amount) : "";
        } catch (err) {
            throw err;
        }
    }

    protected static getCsvStore = () => {
        try {
            if (this.csvStore.length > 0) return this.csvStore;

            this.setCsvStore();
            return this.csvStore;
        } catch (err) {
            console.log(err.message);
        }

    }

    protected static getGroupedCsvStore = (): TransactionStore[] => {
        try {
            if (this.csvStoreGroupedByTokenType.length > 0) return this.csvStoreGroupedByTokenType;

            this.setCsvStore();
            return this.csvStoreGroupedByTokenType;
        } catch (err) {
            console.log(err.message);
        }

    }

    protected static getGroupedCsvStoreByDate = (): TransactionStore[] => {
        try {
            if (this.csvStoreGroupedByDate.length > 0) return this.csvStoreGroupedByDate;

            this.setCsvStore();
            return this.csvStoreGroupedByDate;
        } catch (err) {
            console.log(err.message);
        }

    }


    protected static getTokenTypes = () => {
        try {
            if (this.tokenTypes.length > 0) return this.tokenTypes;

            this.setCsvStore();
            return this.tokenTypes;
        } catch (err) {
            console.log(err.message);
        }

    };
}