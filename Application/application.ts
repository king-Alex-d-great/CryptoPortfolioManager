import { RequestService } from "../Controller/Services/requestService"
import * as inquirer from "inquirer";
import { Choices as Choice, IController, IRequestService } from "../Models";
import { Controller } from "../Controller";

export class Application {
  private availableTokens = [];
  private csvService: IRequestService;
  private controller: IController;

  constructor(requestService: IRequestService) {
    this.csvService = requestService;
    this.controller = new Controller(requestService);
    this.availableTokens = this.csvService.getAvailableTokens();
  }

  public run = async () => {
    this.menuHandler();
  }

  private mainMenu = () => {
    let choices = [
      Choice.AllBalances,
      Choice.OneBalance,
      Choice.AllBalancesByDate,
      Choice.OneBalanceByDate
    ]

    return inquirer
      .prompt([
        {
          name: "MenuOption",
          type: "list",
          message: "Welcome to your portfolio manager\n\n",
          choices
        }
      ]);
  }

  private menuHandler = async () => {
    let option = await this.mainMenu();

    let result: [] | string;

    let choice: Choice;

    if (option.MenuOption == Choice.OneBalance) {
      choice = Choice.OneBalance;
      result = (await this.controller.handleGetATokenBalance(this.availableTokens)).toString();
    }

    if (option.MenuOption == Choice.AllBalances) {
      choice = Choice.AllBalances;
      result = await this.controller.handleGetAllTokenBalances();
    }

    if (option.MenuOption == Choice.AllBalancesByDate) {
      choice = Choice.AllBalancesByDate;
      result = await this.controller.handleGetAllTokenBalancesOnDate();
    }

    if (option.MenuOption == Choice.OneBalanceByDate) {
      choice = Choice.OneBalanceByDate;
      result = (await this.controller.handleGetATokenBalanceOnDate(this.availableTokens)).toString();
    }

    console.log(typeof(result), "TYPE")
    console.log(`Query: ${choice}\n`)

    if (typeof (result) == "string"){
      console.log(`Result: ${result}`);
    }
    else {
      console.log("Result:\n")
      result.forEach(x => console.log(x));
    }

    this.menuHandler();
  }
}