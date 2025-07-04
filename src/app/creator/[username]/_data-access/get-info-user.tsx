"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createUsernameSchema = z.object({
  username: z.string({ message: "Username é obrigatório" })
})

type CreateUsernameSchema = z.infer<typeof createUsernameSchema>

export async function getInfoUser(data: CreateUsernameSchema) {
  const schema = createUsernameSchema.safeParse(data)

  if (!schema.success) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: data.username
      },
      select: {
        id: true,
        name: true,
        userName: true,
        image: true,
        bio: true,
      }
    })

    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      username: user.userName,
      image: user.image,
      bio: user.bio
    }
  } catch (err) {
    return null
  }
}
