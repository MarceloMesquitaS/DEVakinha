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
        return {
        }
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
        return user
    } catch (err) {
        return null
    }
}