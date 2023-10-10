import { PrismaClient } from '@prisma/client'
import { Currency } from '../entity/currency'

const prisma = new PrismaClient()

export async function createCurrecy(c: Currency) {
  const currency = await prisma.currency.create({
    data: {
      key: c.getCurrency(),
      value: c.value
    },
  })
  console.log(currency)
}