import express, { Express, Request, Response } from "express"
import { Currency, ExchangeRate } from "./entity/currency"
import { Wallet } from "./entity/wallet"
import { User } from "./entity/user"
import { createCurrecy } from "./service/createCurrencyService"
import { createWallet, updateWallet } from "./service/createWalletServie"
import { createUser } from "./service/createUserService"
import { getAllUser, getUniqueUser } from "./service/getUserService"
import { decryptHashPass, hashPass } from "./service/passwordHashService"
import { getAllCurrency, getUniqueCurrency } from "./service/getCurrencyService"
import { generateAccessToken, veryifyAccessToken } from "./service/jwtService"
import { createExchangeRate } from "./service/createExchangeRateService"
import { RequestCreateUser, Rate } from "./model/viewModel"
import { getAllExchangeRate } from "./service/getExchangeRateService"
import { getUserWallets, getWallet } from "./service/getWalletService"
import { waitForDebugger } from "inspector"

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
    const reqBody: RequestCreateUser = req.body
    let user = await createUser(reqBody.email, await hashPass(reqBody.password, salt))
    res.json(user)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
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

app.get('/users/all', async (req: Request, res: Response) => {
  if (req.body.email != "admin@example.com") {
    throw new Error("only admin can access all user data")
  }
  let dbUsers = await getAllUser()
  let users: User[] = []

  dbUsers.forEach(u => {
    users.push({ id: u.id, email: u.email })
  })

  res.json(users)
})

app.post('/create/currency', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (req.body.email != "admin@example.com") {
      throw new Error("only admin can create new currency")
    }
    let curObj = new Currency(req.body.key, req.body.value);
    let currency = await createCurrecy(curObj);
    res.json(currency)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/create/exchangerate', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (req.body.email != "admin@example.com") {
      throw new Error("only admin can create new currency")
    }
    let fromCur = await getUniqueCurrency(parseInt(req.body.from_id))
    let fromCurrency = new Currency(fromCur.key, fromCur.value)
    let toCur = await getUniqueCurrency(parseInt(req.body.to_id))
    let toCurrency = new Currency(toCur.key, toCur.value)

    let exObj = new ExchangeRate(fromCurrency, toCurrency, parseFloat(req.body.rate));
    let currency = await createExchangeRate(exObj);
    res.json(currency)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/currency/all', async (req: Request, res: Response) => {
  let dbCurrency = await getAllCurrency()
  res.json(dbCurrency)
})

app.get('/exchangerate/all', async (req: Request, res: Response) => {
  let dbExchangeRate = await getAllExchangeRate()
  res.json(dbExchangeRate)
})

app.post('/create/wallet', authenticateToken, async (req: Request, res: Response) => {
  try {
    let user = await getUniqueUser(req.body.email)
    let dbCurrency = await getUniqueCurrency(parseInt(req.body.currency_id))
    let currency = new Currency(dbCurrency.key, dbCurrency.value)
    let wallet = new Wallet(currency, parseFloat(req.body.amount))
    let dbWallet = await createWallet(wallet, user.id)
    res.json(dbWallet)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/wallet', authenticateToken, async (req: Request, res: Response) => {
  try {
    let user = await getUniqueUser(req.body.email)
    let userWallets = await getUserWallets(user.id)
    res.json(userWallets)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/wallet/deposit', authenticateToken, async (req: Request, res: Response) => {
  try {
    let user = await getUniqueUser(req.body.email)
    let userWallet = await getWallet(parseInt(req.body.wallet_id))
    if (userWallet.authorId != user.id && req.body.email != 'admin@example.com') {
      throw new Error('wallet is not belong to this user')
    }
    let dbCur = await getUniqueCurrency(userWallet.currencyId)
    let currency = new Currency(dbCur.key, dbCur.value)
    let wallet = new Wallet(currency, userWallet.amount)
    wallet.deposit(parseFloat(req.body.deposit))
    let success = await updateWallet(wallet, userWallet.id)
    res.json({ msg: success })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/wallet/withdraw', authenticateToken, async (req: Request, res: Response) => {
  try {
    let user = await getUniqueUser(req.body.email)
    let userWallet = await getWallet(parseInt(req.body.wallet_id))
    if (userWallet.authorId != user.id && req.body.email != 'admin@example.com') {
      throw new Error('wallet is not belong to this user')
    }
    let dbCur = await getUniqueCurrency(userWallet.currencyId)
    let currency = new Currency(dbCur.key, dbCur.value)
    let wallet = new Wallet(currency, userWallet.amount)
    wallet.withdraw(parseFloat(req.body.withdraw))
    let success = await updateWallet(wallet, userWallet.id)
    res.json({ msg: success })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/transfer/', authenticateToken, async (req: Request, res: Response) => {
  try {
    let user = await getUniqueUser(req.body.email)
    let userWallet = await getWallet(parseInt(req.body.wallet_id))
    if (userWallet.authorId != user.id) {
      throw new Error('wallet is not belong to this user')
    }
    let dest_wallet = await getWallet(parseInt(req.body.dest_wallet_id))

    let userCur = await getUniqueCurrency(userWallet.currencyId)
    let destCur = await getUniqueCurrency(dest_wallet.currencyId)
    let userCurrency = new Currency(userCur.key, userCur.value)
    let destCurrency = new Currency(destCur.key, destCur.value)

    let dbRates = await getAllExchangeRate()
    let rates: Rate[] = []
    dbRates.forEach(e => {
      rates.push({ name: e.name, rate: e.rate })
    })

    let walletFrom = new Wallet(userCurrency, userWallet.amount)
    let walletTo = new Wallet(destCurrency, dest_wallet.amount)
    walletFrom.tranfer(walletTo, req.body.transfer, rates)

    let fromWallet = await updateWallet(walletFrom, userWallet.id)
    let toWallet = await updateWallet(walletTo, dest_wallet.id)
    res.json({ wallet_from: fromWallet, wallet_to: toWallet })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(port, () => {
  console.log(`🚀 app listening on port ${port}`)
})