import { PrismaClient } from '@prisma/client'
import { Currency as C } from '@prisma/client'
import { Currency } from '../entity/currency'

const prisma = new PrismaClient()

export async function createCurrecy(c: Currency): Promise<C> {
  const currency = await prisma.currency.create({
    data: {
      key: c.getCurrency(),
      value: c.value
    },
  })
  prisma.$disconnect
  return currency;
}