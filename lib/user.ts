import { compareSync } from "bcrypt-ts";
import db from "./db";

type User = {
  email: string;
  name: string;
  password?: string;
};
export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  console.log("Buscando usuário com o e-mail:", email);

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    console.log("Usuário não encontrado.");
    return null;
  }

  console.log("Usuário encontrado:", user);

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    console.log("Senha válida para o usuário:", user.email);
    return { email: user.email, name: user.name };
  }

  console.log("Senha inválida para o usuário:", user.email);
  return null;
}
