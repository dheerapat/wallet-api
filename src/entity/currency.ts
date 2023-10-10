export class Currency {
    private readonly key: string
    public readonly value: string

    constructor(_key: string, _value:string) {
        this.key = _key;
        this.value = _value
    }

    public getCurrency(): string {
        return this.key;
    }
}

export class ExchangeRate {
    private readonly from: string
    private readonly to: string
    public readonly rate: number
    public readonly name: string

    constructor(_from: Currency, _to: Currency, _rate: number) {
        this.from = _from.getCurrency();
        this.to = _to.getCurrency();
        this.rate = _rate;
        this.name = this.from + "->" + this.to
    }
}