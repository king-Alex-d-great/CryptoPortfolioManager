
export enum Choices {
    AllBalances = "View portfolio value for all tokens in your wallet",
    OneBalance = "View portfolio value for any token in your wallet",
    AllBalancesByDate = "View portfolio value for all tokens in your wallet on a particular date",
    OneBalanceByDate = "View portfolio value for any token in your wallet on a particular date"
}

export interface IController {
    handleGetATokenBalance(availableTokens: string[]): Promise<string>,
    handleGetAllTokenBalances(): Promise<[]>,
    handleGetAllTokenBalancesOnDate(): Promise<[]>,
    handleGetATokenBalanceOnDate(availableTokens: string[]): Promise<string>,
    getAvailableTokens(): string[]
}
export interface Transaction {
    timestamp: string;
    transaction_type: TransactionType;
    token: string;
    amount: number
}

export interface TransactionStore {
    name: string,
    balance: number,
    transactions: Transaction[]
}

export enum TransactionType {
    withdrawal = "WITHDRAWAL",
    deposit = "DEPOSIT"
}


export interface IRequestService {
    getTransactions(token: string): Transaction[];
    getTransactionsByDate(date: Date): TransactionStore;
    getBalance(token: string);
    getBalanceByDate(date: Date, token: string);
    getAvailableTokens(): string[];
}

export interface IUtils {
    getTokenType(availableTokens: string[]);
    getDate()
}
