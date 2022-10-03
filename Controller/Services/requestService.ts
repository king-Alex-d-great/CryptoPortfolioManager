import { IRequestService, Transaction, TransactionStore, TransactionType } from "../../Models";
import { CsvHandler } from "../../Repository/csvRepository";

export class RequestService extends CsvHandler implements IRequestService {
    constructor() {
        super();
        RequestService.getCsvStore();
    }

    private calculateTransactions = (transactions: Transaction[], transactionType: TransactionType): number => {
        transactions = transactions.filter(x => x.transaction_type == transactionType);

        return transactions.reduce((sum, current) => sum + +current.amount, 0);
    }  

    public getTransactionsByDate = (date: Date): TransactionStore => {

        const csvStore: TransactionStore[] = RequestService.getGroupedCsvStoreByDate();

        let transactions = csvStore.find(x => x.name == date.toDateString());
        return transactions;
    }

    public getBalance = (token = null) => {
        try {
            const csvStore: TransactionStore[] = RequestService.getGroupedCsvStore();
            if (token == null || token == "") {
                return csvStore.map(x => ({ "name": x.name, "balance": x.balance }))
            }

            let transactiontype: TransactionStore = csvStore.find((x) => x.name.toLowerCase() == token.toLowerCase());
            return transactiontype.balance;
        } catch (err) {
            console.log(err.message);
        }
    }

    public getBalanceByDate = (date: Date, token: string = "") => {
        try {
            let csvStore = this.getTransactionsByDate(date);
            let availableTokens = RequestService.getTokenTypes();
            let transactions: Transaction[] = csvStore.transactions;

            if (token.length > 0) {
                transactions = csvStore.transactions.filter(x => x.token.toLowerCase() == token.toLowerCase());
                const deposits = this.calculateTransactions(transactions, TransactionType.deposit);
                const withdrawals = this.calculateTransactions(transactions, TransactionType.withdrawal);
                return deposits - withdrawals;
            }

            return availableTokens.map(tkn => {
                transactions = csvStore.transactions.filter(x => x.token.toLowerCase() == tkn.toLowerCase());
                const deposits = this.calculateTransactions(transactions, TransactionType.deposit);
                const withdrawals = this.calculateTransactions(transactions, TransactionType.withdrawal);
                return { "name": tkn, "balance": (deposits - withdrawals) };
            })
        } catch (err) {
            console.log(err.message);
        }

    }

    public getAvailableTokens = (): string[] => {
        return RequestService.getTokenTypes();
    }
}
