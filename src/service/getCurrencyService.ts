import { PrismaClient, Currency } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllCurrency(): Promise<Currency[]> {
    const currencies = await prisma.currency.findMany();
    prisma.$disconnect;
    return currencies;
}