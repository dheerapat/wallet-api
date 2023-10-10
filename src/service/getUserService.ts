import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllUser(): Promise<User[]> {
    const user = await prisma.user.findMany();
    prisma.$disconnect;
    return user;
}

export async function getUniqueUser(_email: string): Promise<User> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: _email
            }
        });
        if (user) {
            return user
        } else {
            throw new Error("user not found")
        }
    } catch (e) {
        throw (e)
    } finally {
        prisma.$disconnect
    }

}