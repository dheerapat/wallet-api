import { PrismaClient } from '@prisma/client'
import { ExchangeRate } from '../entity/currency'

const prisma = new PrismaClient()

export async function createCurrecy(e: ExchangeRate) {
  const exchange = await prisma.exchangeRate.create({
    data: {
        name: e.name,
        rate: e.rate
    },
  })
  console.log(exchange)
}