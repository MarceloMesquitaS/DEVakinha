"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const changeNameSchema = z.object({
  name: z.string().min(4, "Nome é obrigatório"),
});

type ChangeNameSchema = z.infer<typeof changeNameSchema>;

export async function changeName(data: ChangeNameSchema) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: "Usuário não autenticado",
    };
  }

  const schema = changeNameSchema.safeParse(data);
  if (!schema.success) {
    return {
      data: null,
      error: schema.error.errors[0].message,
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    console.log("changeName - usuário atualizado com sucesso", user);

    return {
      data: user,
      error: null,
    };
  } catch (err) {
    console.error("changeName - erro ao atualizar nome:", err);
    return {
      data: null,
      error: "Erro ao atualizar o nome",
    };
  }
}
