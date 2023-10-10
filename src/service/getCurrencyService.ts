import { PrismaClient, Currency } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllCurrency(): Promise<Currency[]> {
    const currencies = await prisma.currency.findMany();
    prisma.$disconnect;
    return currencies;
}

export async function getUniqueCurrency(_id: number): Promise<Currency> {
    try {
        const currency = await prisma.currency.findUnique({
            where: {
                id: _id
            }
        });
        if (currency) {
            return currency
        } else {
            throw new Error("currency not found")
        }
    } catch (e) {
        throw (e)
    } finally {
        prisma.$disconnect
    }
}