export class Payment {
  cardHolderName!: string;
  cardType!: string;
  cardNo!: string;
  cvv!: number;
  expiry!: Date;
  amount:number=400;
  userId!:number;
  doctorId!:string;
}
