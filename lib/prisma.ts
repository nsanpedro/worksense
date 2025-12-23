// Prisma client - solo se inicializa si hay DATABASE_URL
// En modo demo, usamos datos hardcodeados en su lugar

let prisma: any = null

// Solo inicializar Prisma si hay DATABASE_URL configurada
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('file:')) {
  try {
    const { PrismaClient } = require('@prisma/client')
    
    const globalForPrisma = globalThis as unknown as {
      prisma: typeof PrismaClient | undefined
    }

    prisma = globalForPrisma.prisma ?? new PrismaClient()

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  } catch (e) {
    console.log('Prisma not available, using demo mode')
  }
}

export { prisma }
