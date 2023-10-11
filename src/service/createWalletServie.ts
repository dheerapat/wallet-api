import { PrismaClient } from '@prisma/client'
import { Wallet as W } from '@prisma/client'
import { Wallet } from '../entity/wallet'

const prisma = new PrismaClient()

export async function createWallet(_w: Wallet, _user_id: number): Promise<W> {
    try {
        const currency = await prisma.currency.findUnique({
            where: {
                key: _w.getCurrency()
            }
        })
        if (!currency) {
            throw new Error("currency not found")
        }

        const userWallet = await prisma.wallet.findFirst({
            where: {
                authorId: _user_id,
                currencyId: currency.id
            }
        })
        if (userWallet) {
            throw new Error("wallet already created")
        }

        const wallet = await prisma.wallet.create({
            data: {
                currencyId: currency.id,
                amount: _w.getAmount(),
                authorId: _user_id
            }
        })
        return wallet
    } catch (e) {
        throw (e);
    } finally {
        prisma.$disconnect
    }

}

export async function updateWallet(_w: Wallet, _wallet_id: number): Promise<string> {
    try {
        const wallet = await prisma.wallet.update({
            where: { id: _wallet_id },
            data: {
                amount: _w.getAmount(),
            }
        })
        return 'update wallet success'
    } catch (e) {
        throw (e);
    } finally {
        prisma.$disconnect
    }

}