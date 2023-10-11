import { Rate } from "../model/viewModel";
import { Currency, ExchangeRate } from "./currency";

export class Wallet {
    private readonly currency: Currency;
    private amount: number;

    constructor(_currency: Currency, _amount: number = 0) {
        this.currency = _currency;
        this.amount = _amount;
    }

    private getRate(from: Currency, to: Currency, exchange: Rate[]): number {
        let name = from.getCurrency() + "->" + to.getCurrency();
        let target = exchange.find(e => e.name === name);

        if (target) {
            return target.rate
        } else {
            throw new Error("no exchange rate available")
        }
    }
    
    public deposit(deposit: number): void {
        this.amount += deposit;
    }

    public withdraw(withdraw: number): void {
        this.amount -= withdraw;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getCurrency(): string {
        return this.currency.getCurrency()
    }

    public tranfer(wallet: Wallet, tranferAmount: number, exchange: Rate[]): void {
        if (this.currency.getCurrency() === wallet.currency.getCurrency()) {
            wallet.amount += tranferAmount
        } else {
            let rate = this.getRate(this.currency, wallet.currency, exchange)
            let exchangeAmount = tranferAmount * rate;
            wallet.amount += exchangeAmount;
        }

        this.amount -= tranferAmount
    }
}
