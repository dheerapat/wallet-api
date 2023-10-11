import { PrismaClient, ExchangeRate } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllExchangeRate(): Promise<ExchangeRate[]> {
    const ex = await prisma.exchangeRate.findMany();
    prisma.$disconnect;
    return ex;
}