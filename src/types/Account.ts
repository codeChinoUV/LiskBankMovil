export interface Account {
  id: number;
  clabe: string;
  createdDate: Date;
  number: string;
  availableBalance: number;
  idClient: number;
  card: Card;
}

export interface DebitAccount {
  id: number;
  account: Account;
}

export interface Card {
  id: number;
  cvv: string;
  dueDate: string;
  nip: number;
  number: string;
}

export interface CreditAccount {
  id: number;
  annuity: number;
  maxCredit: number;
  closingDate: Date;
  paymentdueDate: Date;
  monthlyPayment: number;
  minimumPayment: number;
  account: Account2;
}

export interface Account2 {
  id: number;
  clabe: string;
  createdDate: Date;
  number: string;
  availableBalance: number;
  idClient: number;
  card: Card;
}

export interface Accounts {
  debitAccounts: DebitAccount[];
  creditAccounts: CreditAccount[];
}
