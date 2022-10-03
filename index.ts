import { Application } from "./Application/application";
import { Controller } from "./Controller";
import { RequestService } from "./Controller/Services/requestService";
import { Utils } from "./Utilities";

let requestService = new RequestService();
let utility = new Utils();
const application = new Application(new Controller(requestService, utility));
application.run();