const assert = require('assert')
const Wallet = require('./wallet')

function testCreateWallet() {
    let wallet = new Wallet.Wallet(Wallet.BTC)
    let assertWallet = new Wallet.Wallet(Wallet.BTC, 100)
    wallet.deposit(100)
    assert.strictEqual(wallet.currency, assertWallet.currency)
    assert.strictEqual(wallet.amount, assertWallet.amount)
    console.log(`running: ${testCreateWallet.name} ⭕`)
}

function testGetAmount() {
    let wallet = new Wallet.Wallet(Wallet.BTC)
    wallet.deposit(45)
    assert.strictEqual(wallet.getAmount(), 45)
    console.log(`running: ${testGetAmount.name} ⭕`)
}

function testTranfer() {
    let walletA = new Wallet.Wallet(Wallet.BTC, 100)
    let walletB = new Wallet.Wallet(Wallet.BTC)
    walletA.tranfer(walletB, 45)
    assert.strictEqual(walletB.amount, 45)
    assert.strictEqual(walletA.amount, 55)
    console.log(`running: ${testTranfer.name} ⭕`)
}

testCreateWallet()
testGetAmount()
testTranfer()