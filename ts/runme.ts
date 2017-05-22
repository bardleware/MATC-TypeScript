import { CreateAccount } from './app';
import { AccountType } from './enum';

let devanChecking = new CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), AccountType.checking)
let devanSavings = new CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), AccountType.savings)
let devanRetirement = new CreateAccount("Devan Sisson", 0, new Date('January 19, 1990 02:09:00'), AccountType.retirement)

devanChecking.depositMoney(300, "")
devanChecking.depositMoney(300, "")
devanSavings.depositMoney(500, "")
devanRetirement.depositMoney(300, "")