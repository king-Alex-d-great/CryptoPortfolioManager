import { IController, IRequestService, IUtils } from "../Models";
import { generateCurrentDataEndpoint, generateHistoricalDataEndpoint } from "../Utilities/priceConverter";


export class Controller implements IController {
    private csvService: IRequestService;
    private utils: IUtils;

    constructor(requestService: IRequestService, utils: IUtils) {
        this.csvService = requestService;
        this.utils = utils;
    }

    public handleGetATokenBalance = async (availableTokens: string[]): Promise<string> => {
        let tokenType = await this.utils.getTokenType(availableTokens);
        let result = this.csvService.getBalance(tokenType);

        let availabletokens = this.getAvailableTokens();
        let usdBalances = await generateCurrentDataEndpoint(availabletokens.toString());

        for (let i in usdBalances) {
            if (i.toLowerCase() == tokenType.toLowerCase())
                result *= (+usdBalances[i].USD);
        }

        return result;
    }

    public handleGetAllTokenBalances = async (): Promise<[]> => {
        let result = this.csvService.getBalance("");

        let availabletokens = this.getAvailableTokens();
        let usdBalances = await generateCurrentDataEndpoint(availabletokens.toString());

        return result.map(x => {
            for (let i in usdBalances) {              
                if (i.toLowerCase() == x.name.toLowerCase()) 
                    x.balance *= (+usdBalances[i].USD);
            }
            return x
        })
    }

    public handleGetAllTokenBalancesOnDate = async (): Promise<[]> => {
        let date = await this.utils.getDate();

        let result = this.csvService.getBalanceByDate(date, "");        
        const unixTime = Math.floor(date.getTime() / 1000)      

        result =  result.map(async x => {
            let usdBalances = await generateHistoricalDataEndpoint(unixTime, x.name);
           
            for (let i in usdBalances) {
                x.balance *= (+usdBalances[i].USD);               
            }
           return x;
        })       
       
        result = await Promise.all(result).then((values) => values);      
        return result;  
    }

    public handleGetATokenBalanceOnDate = async (availableTokens: string[]): Promise<string> => {
        let date = await this.utils.getDate();
        let tokenType = await this.utils.getTokenType(availableTokens)
        let result = this.csvService.getBalanceByDate(date, tokenType);

      
        const unixTime = Math.floor(date.getTime() / 1000)
        let usdBalances = await generateHistoricalDataEndpoint(unixTime, tokenType);       

        for (let i in usdBalances) {
            result *= (+usdBalances[i].USD);
        }

        return result;
    }

    public getAvailableTokens = (): string[] => {
        return this.csvService.getAvailableTokens();
    }   
}
