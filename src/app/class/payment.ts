export class Payment {
  cardHolderName!: string;
  cardType!: string;
  cardNo!: string;
  cvv!: number;
  expiry!: Date;
  fees = 400;
}
