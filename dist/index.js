"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./Application/application");
const requestService_1 = require("./Controller/Services/requestService");
const application = new application_1.Application(new requestService_1.RequestService());
application.run();
