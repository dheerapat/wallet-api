import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(_email: string, _password: string): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: {
        email: _email,
        password: _password
      }
    })

    prisma.$disconnect

    return user
  } catch (e) {
    throw (e);
  } finally {
    prisma.$disconnect
  }
}