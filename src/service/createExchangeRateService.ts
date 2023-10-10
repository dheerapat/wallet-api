import { PrismaClient, ExchangeRate as E } from '@prisma/client'
import { ExchangeRate } from '../entity/currency'

const prisma = new PrismaClient()

export async function createCurrecy(e: ExchangeRate): Promise<E> {
  const exchange = await prisma.exchangeRate.create({
    data: {
        name: e.name,
        rate: e.rate
    },
  })
  prisma.$disconnect;
  return exchange;
}