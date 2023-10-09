import { Currency } from "./currency";

const crypto = require('crypto')

export class Wallet {
    private readonly id: string
    private readonly currency: Currency;
    private amount: number;

    constructor(_currency: Currency, _amount: number = 0) {
        this.id = crypto.randomUUID()
        this.currency = _currency;
        this.amount = _amount;
    }

    private getRate(from: Currency, to: Currency): number {
        throw new Error("not implemented")
    }
    
    public deposit(deposit: number): void {
        this.amount += deposit;
    }

    public getAmount(): number {
        return this.amount;
    }

    public tranfer(wallet: Wallet, tranferAmount: number): void {
        if (this.currency === wallet.currency) {
            wallet.amount += tranferAmount
        } else {
            let rate = this.getRate(this.currency, wallet.currency)
            let exchangeAmount = tranferAmount * rate;
            wallet.amount += exchangeAmount;
        }

        this.amount -= tranferAmount
    }
}
