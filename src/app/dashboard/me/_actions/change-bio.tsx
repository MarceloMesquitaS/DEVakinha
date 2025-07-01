"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const changeBioSchema = z.object({
  bio: z.string().min(4, "A biografia precisa ter pelo menos 4 caracteres"),
});

type ChangeBioSchema = z.infer<typeof changeBioSchema>;

export async function changeBio(data: ChangeBioSchema) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: "Usuário não autenticado",
    };
  }

  const schema = changeBioSchema.safeParse(data);
  if (!schema.success) {
    return {
      data: null,
      error: schema.error.errors[0].message,
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { bio: data.bio },
    });

    return {
      data: user,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: "Erro ao atualizar o nome",
    };
  }
}
