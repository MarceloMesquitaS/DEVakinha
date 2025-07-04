"use server"

import { prisma } from "@/lib/prisma";
import { z } from "zod";


const createUsernameSchema = z.object({
    slug: z.string().min(1, "Slug do creador é obrigatório"),
    nome: z.string().min(1, "O nome precisa ter pelo menos 1 caractere"),
    message: z.string().min(1, "A mensagem precisa ter pelo menos 1 caractere"),
    price: z.number().min(1500, "Selecione um valor maior que R$15,00"),
    creatorId: z.string()
})

type CreatePaymentSchema = z.infer<typeof createUsernameSchema>;

export async function createPayments(data: CreatePaymentSchema) {
    const schema = createUsernameSchema.safeParse(data);
    if (!schema.success) {
        return {
            data: null,
            error: schema.error.issues[0].message,
        }
    }

    try {

        console.log(data);

    } catch (err) {
        return {
            data: null,
            error: "Erro ao criar pagamento, tente novamente mais tarde.",
        }

    }
}
