export interface RequestCreateUser {
    email: string,
    password: string
}

export interface RequestCreateWallet {
    email: string,
    currency_id: string
    amount: number | undefined
}