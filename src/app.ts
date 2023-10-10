import express, { Express, Request, Response } from "express"
import { Currency } from "./entity/currency"
import { Wallet } from "./entity/wallet"
import { createCurrecy } from "./service/createCurrencyService"
import { createWallet } from "./service/createWalletServie"
import { createUser } from "./service/createUserService"

const app: Express = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})