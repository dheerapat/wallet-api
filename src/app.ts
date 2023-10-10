import express, { Express, Request, Response } from "express"
import { Currency } from "./entity/currency"
import { Wallet } from "./entity/wallet"
import { User } from "./entity/user"
import { createCurrecy } from "./service/createCurrencyService"
import { createWallet } from "./service/createWalletServie"
import { createUser } from "./service/createUserService"
import { getAllUser, getUniqueUser } from "./service/getUserService"
import { decryptHashPass, hashPass } from "./service/passwordHashService"
import { getAllCurrency } from "./service/getCurrencyService"
import { generateAccessToken, veryifyAccessToken } from "./service/jwtService"

const dotenv = require('dotenv')

dotenv.config();

const app: Express = express()
const port: number = parseInt(process.env.PORT!)
const salt: number = process.env.ENV === "dev" ? parseInt(process.env.SALT_DEV!) : parseInt(process.env.SALT_PRD!)

function authenticateToken(req: Request, res: Response, next: any) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    let data = veryifyAccessToken(token)

    req.body.email = data
    next()
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.json({ app: 'chomchob-wallet-api' })
})

app.post('/create/user', async (req: Request, res: Response) => {
  try {
    let user = await createUser(req.body.email, await hashPass(req.body.password, salt))
    res.json(user)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/users/all', async (req: Request, res: Response) => {
  let dbUsers = await getAllUser()
  let users: User[] = []

  dbUsers.forEach(u => {
    users.push({ id: u.id, email: u.email })
  })

  res.json(users)
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    let dbUser = await getUniqueUser(req.body.email);
    let isPassValid = await decryptHashPass(req.body.password, dbUser.password);
    if (isPassValid) {
      res.json({
        accessToken: generateAccessToken(dbUser.email),
      })
    } else {
      res.status(400).json({ error: "password invalid" })
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }

})

app.post('/create/currency', async (req: Request, res: Response) => {
  try {
    let curObj = new Currency(req.body.key, req.body.value);
    let currency = await createCurrecy(curObj);
    res.json(currency)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/currency/all', async (req: Request, res: Response) => {
  let dbCurrency = await getAllCurrency()
  res.json(dbCurrency)
})

app.listen(port, () => {
  console.log(`🚀 app listening on port ${port}`)
})