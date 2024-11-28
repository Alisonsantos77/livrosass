"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  // se não tiver email, nome ou senha
  if (!data.email || !data.name || !data.password) {
    return {
      message: "Preencha todos os campos",
      success: false,
    };
  }

  // se um usuario já existe
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      message: "Usuário já existe",
      success: false,
    };
  }

  // se não existir, cria o usuario
  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password),
    },
  });
  return redirect("/");
}
