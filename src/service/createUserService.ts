import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(_email: string, _password: string) {
  const user = await prisma.user.create({
    data: {
      email: _email,
      password: _password
    },
  })
  console.log(user)
}