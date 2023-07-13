import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return users
  })

  app.get('/users/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const user = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return user
  })
}
