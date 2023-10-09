const crypto = require('crypto')

export enum Currency {
    BTC,
    ETH
}

export class Wallet {
    private readonly id: string
    private readonly currency: Currency;
    private amount: number;

    constructor(_currency: Currency, _amount: number = 0) {
        this.id = crypto.randomUUID()
        this.currency = _currency;
        this.amount = _amount;
    }

    public deposit(deposit: number): void {
        this.amount += deposit;
    }

    public getAmount(): number {
        return this.amount;
    }

    public tranfer(wallet: Wallet, tranferAmount: number): void {
        if (this.currency == wallet.currency) {
            wallet.amount += tranferAmount
            this.amount -= tranferAmount
        }
    }
}
