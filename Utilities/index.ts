import * as inquirer from "inquirer";
import { IUtils } from "../Models";


export class Utils implements IUtils{

    public getTokenType = async (availableTokens: string[]) => {
        try {
            let isValidResponse = false;
            availableTokens = availableTokens.map(x => x.toLowerCase());

            let Option = "";
            while (!isValidResponse) {
                let result = (await this.getCollector(`Enter a valid token option\nAvailable option ${availableTokens ?? "None"}`));

                if (availableTokens.includes(result.Option.toLowerCase())) {
                    isValidResponse = true;
                    Option = result.Option;
                }
                else {
                    console.log("Invalid Option!")
                }
            }

            return Option;
        } catch (err) {
            console.log(err.message);
        }
    }

    public getDate = async () => {
        try {
            let isValidResponse = false;
            let requestDate: Date;

            while (!isValidResponse) {
                let userInput = await this.getCollector(`\nPlease Enter a Valid Date\nTip: 2019-10-24\n`);
                requestDate = new Date(userInput.Option);
                if (this.isDateValid(requestDate)) {
                    isValidResponse = true;
                }
                else {
                    console.log("Invalid Date!")
                }
            }

            return requestDate as Date;
        } catch (err) {
            console.log(err.message);
        }

    }

    private getCollector = (question: string) => {
        return inquirer
            .prompt([
                {
                    name: "Option",
                    type: "input",
                    message: `${question}\n\n`
                }
            ]);
    }

    private isDateValid(date: Date): boolean {
        return date instanceof Date && !isNaN(+date);
    }
}