import { PrismaClient } from '@prisma/client'
import { Wallet as W } from '@prisma/client'
import { Wallet } from '../entity/wallet'

const prisma = new PrismaClient()

export async function createWallet(_w: Wallet, _user_id: number): Promise<W> {
    try {
        const userWallet = await prisma.wallet.findUnique({
            where: {
                authorId: _user_id
            }
        })
        if (userWallet) {
            throw new Error("wallet already created")
        }

        const currency = await prisma.currency.findUnique({
            where: {
                key: _w.getCurrency()
            }
        })
        if (currency) {
            const wallet = await prisma.wallet.create({
                data: {
                    currencyId: currency.id,
                    amount: _w.getAmount(),
                    authorId: _user_id
                }
            })
            return wallet
        } else {
            throw new Error("error when trying to create wallet")
        }
    } catch (e) {
        throw (e);
    } finally {
        prisma.$disconnect
    }
    
}