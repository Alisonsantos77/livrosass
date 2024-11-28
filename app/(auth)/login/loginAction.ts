"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export default async function loginAction(_prevState: any, formData: FormData) {
  // await signin
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: "/dashboard"
    });
    return {
      success: true,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e.type === "CredentialsSignin") {
      return {
        success: false,
        message: "Credenciais inválidas",
      };
    }
    return {
      success: false,
      message: "Ops, algum erro aconteceu!",
    };
  }
}
