import express, { Express, Request, Response } from "express"
import { Currency } from "./entity/currency"
import { Wallet } from "./entity/wallet"
import { createCurrecy } from "./service/createCurrencyService"
import { createWallet } from "./service/createWalletServie"
import { createUser } from "./service/createUserService"
import { getAllUser } from "./service/getUserService"
import { hashPass } from "./service/passwordHashService"

const app: Express = express()
const port = 3000
const salt = 1 // for dev only

app.use(express.urlencoded({extended : true}))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post('/create/user', async (req: Request, res: Response) => {
  try {
    let user = await createUser(req.body.email, await hashPass(req.body.password, salt))
    res.json(user)
  } catch (e: any) {
    res.status(500).json({error: e.message})
  }
})

app.get('/users/all',async (req: Request, res: Response) => {
    let users = await getAllUser()
    res.json(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})