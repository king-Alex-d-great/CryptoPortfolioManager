import * as inquirer from "inquirer";
import { Choices as Choice, IController } from "../Models";

export class Application {
  private availableTokens = [];  
  private controller: IController;

  constructor(controller : IController) {    
    this.controller = controller;
    this.availableTokens = this.controller.getAvailableTokens();
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

  protected menuHandler = async () => {
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
    
    console.log(`Query: ${choice}\n`)
    if (typeof (result) == "string"){
      console.log(`Result (USD): ${result}`);
    }
    else {
      console.log("Result (USD):\n")
      result.forEach(x => console.log(x));
    }

    this.menuHandler();
  }
}