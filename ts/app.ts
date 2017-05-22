import { Transaction, Account } from './interface';
import { TransactionOrigin, AccountType } from './enum';

class CreateAccount implements Account {
  createdDate: Date;
  currentDate: Date;
  accountType: AccountType;
  accountHolderName: string;
  accountHolderBirthDate: Date;
  balance: number;
  accountHistory: Transaction[];
  transactionOrigin: TransactionOrigin;

  constructor(name: string, balance: number, birthdate: Date, accountType: AccountType) {
    this.transactionOrigin = 0;
    this.accountHolderName = name;
    this.accountHolderBirthDate = birthdate;
    this.balance = initBalance(accountType);
    this.accountType = accountType;
    this.createdDate = new Date();
    this.currentDate = new Date();
    this.accountHistory = []


    function initBalance(acctType: AccountType): number {
      let balance: number = 0;
      switch (acctType) {
        case AccountType.checking:
          balance = 1000;
          break;

        case AccountType.savings:
          balance = 10000;
          break;

        case AccountType.retirement:
          balance = 100000;
          break;
      }

      return balance;
    }
    let accountKind = AccountType[this.accountType].toLocaleUpperCase();
    console.log(`New ${accountKind} account created!`)
    console.log(this);

  }

  advanceDate(numberOfDays: number) {
    let interestGain: any;
    let interestEarned: number;
    let interestRate: number = this.accountType * 0.01;

    let numberOfMonths: number;
    let today: Date = new Date();
    let month: number = today.getMonth();
    let year: number = today.getFullYear();

    today.setDate(today.getDate() + numberOfDays);
    this.currentDate = today;
    numberOfMonths = ((today.getMonth() + 1) + (today.getFullYear() - year) * 12);
    interestEarned = this.balance * (1 + ((interestRate / 12) ** numberOfMonths));

    interestGain = {
      success: true,
      amount: interestEarned,
      resultBalance: (interestEarned + this.balance),
      transactionDate: new Date(),
      description: `Interest Accrual of ${interestEarned} into ${AccountType[this.accountType]} resulting in a balance of ${interestEarned + this.balance}.`,
      errorMessage: ""
    }
    this.balance = interestEarned + this.balance;
    this.accountHistory.push(interestGain);
    if (today.getMonth() != this.createdDate.getMonth()) {
      this.transactionOrigin = 0;
    }


  }

  depositMoney(amount: number, description: string): Transaction {
    let newBalance = this.balance + amount;
    let transaction: Transaction = {
      success: true,
      amount: amount,
      resultBalance: newBalance,
      transactionDate: new Date(),
      description: `Deposit $${amount} into ${AccountType[this.accountType]}, resulting in a balance of $${newBalance}.`,
      errorMessage: ""
    }

    this.accountHistory.push(transaction);
    console.log(`${AccountType[this.accountType]} ACCOUNT HISTORY ->`)
    console.log(this.accountHistory);
    this.balance = newBalance;


    return transaction;
  };

  withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
    let fn: any;
    switch (this.accountType) {
      case AccountType.checking:
        fn = function (amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
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

          let newBalance = this.balance - amount;
          let withdrawn = amount * -1
          let transaction: Transaction = {
            success: true,
            amount: withdrawn,
            resultBalance: newBalance,
            transactionDate: new Date(),
            description: `Withdrawal of $${withdrawn} from ${AccountType[this.accountType]} resulting in a balance of $${newBalance}.`,
            errorMessage: ""
          }

          this.accountHistory.push(transaction);
          console.log(transaction);
          console.log(this.accountHistory);
          this.balance = this.balance - amount;
          return transaction;
        }
        break;
      case AccountType.savings:
        fn = function (amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
          if (transactionOrigin != TransactionOrigin.branch && this.transactionOrigin < 6) {
            return withdraw()
          } else if (transactionOrigin == TransactionOrigin.branch) {
            return withdraw()
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

            let newBalance = this.balance - amount;
            let withdrawn = amount * -1
            let transaction: Transaction = {
              success: true,
              amount: withdrawn,
              resultBalance: newBalance,
              transactionDate: new Date(),
              description: `Withdrawal of $${withdrawn} from ${AccountType[this.accountType]} resulting in a balance of $${newBalance}.`,
              errorMessage: "",
            }

            this.accountHistory.push(transaction);
            console.log(transaction);
            console.log(this.accountHistory);
            this.balance = this.balance - amount;
            return transaction;
          }
        }
        break;
      case AccountType.retirement:
        fn = function (amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
          let accountHolderAge: number = this.currentDate.getFullYear() - this.accountHolderBirthDate.getFullYear()
          if (accountHolderAge < 60) {
            let tenPercentFee: number = this.balance * 0.1;
            return withdraw(tenPercentFee)
          } else if (transactionOrigin == TransactionOrigin.branch) {
            let tenPercentFee: number = 0;
            return withdraw(tenPercentFee)
          }

          function withdraw(tenPercentFee: number) {
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

            let newBalance = this.balance - (amount + tenPercentFee);
            let withdrawn = amount * -1
            let transaction: Transaction = {
              success: true,
              amount: withdrawn,
              resultBalance: newBalance,
              transactionDate: new Date(),
              description: `Withdrawal of $${withdrawn} from ${AccountType[this.accountType]} resulting in a balance of $${newBalance}.
                If you are under the age of 60 you will be changed a fee of $${tenPercentFee} for pre-retirement access`,
              errorMessage: "",
            }

            this.accountHistory.push(transaction);
            console.log(transaction);
            console.log(this.accountHistory);
            this.balance = this.balance - (amount + tenPercentFee)
            return transaction;
          }
        }
        break;
    }
    return fn();
  };

}

export { CreateAccount };