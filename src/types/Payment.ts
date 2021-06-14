export interface Payment {
  id: number;
  totalDebt: number;
  paymentDate: Date;
  monthlyTotal: number;
  minimum: number;
  paymentMade: number;
  cycle: Date;
  recharge: number;
  idCreditAccount: number;
}
