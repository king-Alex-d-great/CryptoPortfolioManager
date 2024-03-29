"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./Application/application");
const Controller_1 = require("./Controller");
const requestService_1 = require("./Controller/Services/requestService");
const Utilities_1 = require("./Utilities");
let requestService = new requestService_1.RequestService();
let utility = new Utilities_1.Utils();
const application = new application_1.Application(new Controller_1.Controller(requestService, utility));
application.run();
