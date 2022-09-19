import prisma from '@prisma/client';

const { PrismaClient } = prisma;

export const client: prisma.PrismaClient = new PrismaClient();
