"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var CreateAccount = (function () {
    function CreateAccount(name, balance, birthdate, accountType) {
        this.transactionOrigin = 0;
        this.accountHolderName = name;
        this.accountHolderBirthDate = birthdate;
        this.balance = initBalance(accountType);
        this.accountType = accountType;
        this.createdDate = new Date();
        this.currentDate = new Date();
        this.accountHistory = [];
        function initBalance(acctType) {
            var balance = 0;
            switch (acctType) {
                case enum_1.AccountType.checking:
                    balance = 1000;
                    break;
                case enum_1.AccountType.savings:
                    balance = 10000;
                    break;
                case enum_1.AccountType.retirement:
                    balance = 100000;
                    break;
            }
            return balance;
        }
        var accountKind = enum_1.AccountType[this.accountType].toLocaleUpperCase();
        console.log("New " + accountKind + " account created!");
        console.log(this);
    }
    CreateAccount.prototype.advanceDate = function (numberOfDays) {
        var interestGain;
        var interestEarned;
        var interestRate = this.accountType * 0.01;
        var numberOfMonths;
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        today.setDate(today.getDate() + numberOfDays);
        this.currentDate = today;
        numberOfMonths = ((today.getMonth() + 1) + (today.getFullYear() - year) * 12);
        interestEarned = this.balance * (1 + (Math.pow((interestRate / 12), numberOfMonths)));
        interestGain = {
            success: true,
            amount: interestEarned,
            resultBalance: (interestEarned + this.balance),
            transactionDate: new Date(),
            description: "Interest Accrual of " + interestEarned + " into " + enum_1.AccountType[this.accountType] + " resulting in a balance of " + (interestEarned + this.balance) + ".",
            errorMessage: ""
        };
        this.balance = interestEarned + this.balance;
        this.accountHistory.push(interestGain);
        if (today.getMonth() != this.createdDate.getMonth()) {
            this.transactionOrigin = 0;
        }
    };
    CreateAccount.prototype.depositMoney = function (amount, description) {
        var newBalance = this.balance + amount;
        var transaction = {
            success: true,
            amount: amount,
            resultBalance: newBalance,
            transactionDate: new Date(),
            description: "Deposit $" + amount + " into " + enum_1.AccountType[this.accountType] + ", resulting in a balance of $" + newBalance + ".",
            errorMessage: ""
        };
        this.accountHistory.push(transaction);
        console.log(enum_1.AccountType[this.accountType] + " ACCOUNT HISTORY ->");
        console.log(this.accountHistory);
        this.balance = newBalance;
        return transaction;
    };
    ;
    CreateAccount.prototype.withdrawMoney = function (amount, description, transactionOrigin) {
        var fn;
        switch (this.accountType) {
            case enum_1.AccountType.checking:
                fn = function (amount, description, transactionOrigin) {
                    if (this.balance - amount < 0) {
                        console.log("You do not have enough funds to complete this transaction");
                        return {
                            success: false,
                            amount: 0,
                            resultBalance: this.balance,
                            transactionDate: new Date(),
                            description: "",
                            errorMessage: "Insufficient funds. Withdrawal denied"
                        };
                    }
                    var newBalance = this.balance - amount;
                    var withdrawn = amount * -1;
                    var transaction = {
                        success: true,
                        amount: withdrawn,
                        resultBalance: newBalance,
                        transactionDate: new Date(),
                        description: "Withdrawal of $" + withdrawn + " from " + enum_1.AccountType[this.accountType] + " resulting in a balance of $" + newBalance + ".",
                        errorMessage: ""
                    };
                    this.accountHistory.push(transaction);
                    console.log(transaction);
                    console.log(this.accountHistory);
                    this.balance = this.balance - amount;
                    return transaction;
                };
                break;
            case enum_1.AccountType.savings:
                fn = function (amount, description, transactionOrigin) {
                    if (transactionOrigin != enum_1.TransactionOrigin.branch && this.transactionOrigin < 6) {
                        return withdraw();
                    }
                    else if (transactionOrigin == enum_1.TransactionOrigin.branch) {
                        return withdraw();
                    }
                    function withdraw() {
                        if (this.balance - amount < 0) {
                            console.log("You do not have enough funds to complete this transaction");
                            return {
                                success: false,
                                amount: 0,
                                resultBalance: this.balance,
                                transactionDate: new Date(),
                                description: "",
                                errorMessage: "Insufficient funds. Withdrawal denied"
                            };
                        }
                        var newBalance = this.balance - amount;
                        var withdrawn = amount * -1;
                        var transaction = {
                            success: true,
                            amount: withdrawn,
                            resultBalance: newBalance,
                            transactionDate: new Date(),
                            description: "Withdrawal of $" + withdrawn + " from " + enum_1.AccountType[this.accountType] + " resulting in a balance of $" + newBalance + ".",
                            errorMessage: "",
                        };
                        this.accountHistory.push(transaction);
                        console.log(transaction);
                        console.log(this.accountHistory);
                        this.balance = this.balance - amount;
                        return transaction;
                    }
                };
                break;
            case enum_1.AccountType.retirement:
                fn = function (amount, description, transactionOrigin) {
                    var accountHolderAge = this.currentDate.getFullYear() - this.accountHolderBirthDate.getFullYear();
                    if (accountHolderAge < 60) {
                        var tenPercentFee = this.balance * 0.1;
                        return withdraw(tenPercentFee);
                    }
                    else if (transactionOrigin == enum_1.TransactionOrigin.branch) {
                        var tenPercentFee = 0;
                        return withdraw(tenPercentFee);
                    }
                    function withdraw(tenPercentFee) {
                        if (this.balance - (amount + tenPercentFee) < 0) {
                            console.log("You do not have enough funds to complete this transaction");
                            return {
                                success: false,
                                amount: 0,
                                resultBalance: this.balance,
                                transactionDate: new Date(),
                                description: "",
                                errorMessage: "Insufficient funds. Withdrawal denied"
                            };
                        }
                        var newBalance = this.balance - (amount + tenPercentFee);
                        var withdrawn = amount * -1;
                        var transaction = {
                            success: true,
                            amount: withdrawn,
                            resultBalance: newBalance,
                            transactionDate: new Date(),
                            description: "Withdrawal of $" + withdrawn + " from " + enum_1.AccountType[this.accountType] + " resulting in a balance of $" + newBalance + ".\n                If you are under the age of 60 you will be changed a fee of $" + tenPercentFee + " for pre-retirement access",
                            errorMessage: "",
                        };
                        this.accountHistory.push(transaction);
                        console.log(transaction);
                        console.log(this.accountHistory);
                        this.balance = this.balance - (amount + tenPercentFee);
                        return transaction;
                    }
                };
                break;
        }
        return fn();
    };
    ;
    return CreateAccount;
}());
exports.CreateAccount = CreateAccount;
//# sourceMappingURL=app.js.map