import { Currency } from "./currency";

const assert = require('assert')
const Wallet = require('./wallet')

let btc = new Currency('BTC')
let eth = new Currency('ETH')

function testCreateWallet() {
    let wallet = new Wallet.Wallet(btc)
    let assertWallet = new Wallet.Wallet(btc, 100)
    wallet.deposit(100)
    assert.strictEqual(wallet.currency, assertWallet.currency)
    assert.strictEqual(wallet.amount, assertWallet.amount)
    console.log(`running: ${testCreateWallet.name} ⭕`)
}

function testGetAmount() {
    let wallet = new Wallet.Wallet(btc)
    wallet.deposit(45)
    assert.strictEqual(wallet.getAmount(), 45)
    console.log(`running: ${testGetAmount.name} ⭕`)
}

function testTranfer() {
    let walletA = new Wallet.Wallet(btc, 100)
    let walletB = new Wallet.Wallet(btc)
    walletA.tranfer(walletB, 45)
    assert.strictEqual(walletB.amount, 45)
    assert.strictEqual(walletA.amount, 55)
    console.log(`running: ${testTranfer.name} ⭕`)
}

testCreateWallet()
testGetAmount()
testTranfer()