import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllUser(): Promise<User[]> {
    const user = await prisma.user.findMany();
    prisma.$disconnect;
    return user;
}