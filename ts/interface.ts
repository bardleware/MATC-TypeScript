import { AccountType, TransactionOrigin } from "./enum";

interface Account {
  accountHolderName: string;
  accountHolderBirthDate: Date;
  balance: number;
  withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction;
  depositMoney(amount: number, description: string): Transaction;
  accountHistory: Transaction[];
  advanceDate(numberOfDays: number);
  accountType: AccountType;
}

interface Transaction {
  success: boolean;
  amount: number; // amount will be positive for deposits and negative for withdrawals:
  resultBalance: number; // resultBalance will be unchanged from the previous balance when success is false.
  transactionDate: Date;
  description: string;
  errorMessage: string; // errorMessage will be an empty string when success is true:
}

export { Transaction, Account };