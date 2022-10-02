import { Application } from "./Application/application";
import { RequestService } from "./Controller/Services/requestService";

const application = new Application(new RequestService());
application.run();