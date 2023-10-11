import { PrismaClient, Wallet } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserWallets(_user_id: number): Promise<Wallet[]> {
    try {
        const wallet = await prisma.wallet.findMany({
            where: {
                authorId: _user_id
            }
        });
        if (wallet) {
            return wallet
        } else {
            throw new Error("wallet not found")
        }
    } catch (e) {
        throw (e)
    } finally {
        prisma.$disconnect
    }
}

export async function getWallet(_wallet_id: number | undefined): Promise<Wallet> {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {
                id: _wallet_id
            }
        });
        if (wallet) {
            return wallet
        } else {
            throw new Error("wallet not found")
        }
    } catch (e) {
        throw (e)
    } finally {
        prisma.$disconnect
    }
}