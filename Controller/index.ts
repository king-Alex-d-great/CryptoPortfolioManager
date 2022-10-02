import { IController, IRequestService } from "../Models";
import { Utils } from "../Utilities";

export class Controller implements IController {
    private csvService: IRequestService;
    private utils: Utils;

    constructor(requestService: IRequestService) {
        this.csvService = requestService;
        this.utils = new Utils();
    }

    public handleGetATokenBalance = async (availableTokens: string[]): Promise<string> => {
        let tokenType = await this.utils.getTokenType(availableTokens);
        return this.csvService.getBalance(tokenType);
    }

    public handleGetAllTokenBalances = (): Promise<[]> => {
        return this.csvService.getBalance("");
    }

    public handleGetAllTokenBalancesOnDate = async(): Promise<[]> => {
        let date = this.utils.getDate();
        return this.csvService.getBalanceByDate(await date, "");
    }

    public handleGetATokenBalanceOnDate = async (availableTokens: string[]): Promise<string> => {
        let date = this.utils.getDate();
        let tokenType = this.utils.getTokenType(availableTokens);
        return this.csvService.getBalanceByDate(await date, await tokenType);
    }
}
