"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var enum_1 = require("./enum");
var devanChecking = new app_1.CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), enum_1.AccountType.checking);
var devanSavings = new app_1.CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), enum_1.AccountType.savings);
var devanRetirement = new app_1.CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), enum_1.AccountType.retirement);
devanChecking.depositMoney(300, "");
devanChecking.depositMoney(300, "");
devanSavings.depositMoney(500, "");
devanRetirement.depositMoney(300, "");
//# sourceMappingURL=runme.js.map