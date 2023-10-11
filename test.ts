import { Currency, ExchangeRate } from "./src/entity/currency";
import { Wallet } from "./src/entity/wallet";
import { Rate } from "./src/model/viewModel";

const assert = require('assert')

// helpers
let btc = new Currency('BTC', 'Bitcoin')
let eth = new Currency('ETH', 'Ethereum')
let btcToEth: Rate = {name: 'BTC->ETH', rate: 100}
let exRate = [btcToEth]

// test case
function testCreateWallet() {
    let wallet = new Wallet(btc)
    let assertWallet = new Wallet(btc, 100)
    wallet.deposit(100)
    assert.strictEqual(wallet.getCurrency(), assertWallet.getCurrency())
    assert.strictEqual(wallet.getAmount(), assertWallet.getAmount())
    console.log(`running: ${testCreateWallet.name} ⭕`)
}

function testGetAmount() {
    let wallet = new Wallet(btc)
    wallet.deposit(45)
    assert.strictEqual(wallet.getAmount(), 45)
    console.log(`running: ${testGetAmount.name} ⭕`)
}

function testTranfer() {
    let walletA = new Wallet(btc, 100)
    let walletB = new Wallet(btc)
    walletA.tranfer(walletB, 45, exRate)
    assert.strictEqual(walletB.getAmount(), 45)
    assert.strictEqual(walletA.getAmount(), 55)
    console.log(`running: ${testTranfer.name} ⭕`)
}

function testTranferChangeRate() {
    let walletA = new Wallet(btc, 100)
    let walletB = new Wallet(eth)
    walletA.tranfer(walletB, 45, exRate)
    assert.strictEqual(walletB.getAmount(), 4500)
    assert.strictEqual(walletA.getAmount(), 55)
    console.log(`running: ${testTranferChangeRate.name} ⭕`)
}

testCreateWallet()
testGetAmount()
testTranfer()
testTranferChangeRate()