"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountType;
(function (AccountType) {
    AccountType[AccountType["checking"] = 1] = "checking";
    AccountType[AccountType["savings"] = 2] = "savings";
    AccountType[AccountType["retirement"] = 3] = "retirement";
})(AccountType || (AccountType = {}));
exports.AccountType = AccountType;
var TransactionOrigin;
(function (TransactionOrigin) {
    TransactionOrigin[TransactionOrigin["web"] = 1] = "web";
    TransactionOrigin[TransactionOrigin["phone"] = 2] = "phone";
    TransactionOrigin[TransactionOrigin["branch"] = 3] = "branch";
})(TransactionOrigin || (TransactionOrigin = {}));
exports.TransactionOrigin = TransactionOrigin;
//# sourceMappingURL=enum.js.map