"use client";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerAction from "./RegisterAction";
import { useActionState } from "react";

function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <Form action={formAction}>
      {state?.success === false && (
        <div className="text-xs mb-6 bg-red-100 border border-red-400 rounded px-4 py-3 relative" role="alert">
          <strong className="font-bold">
          </strong>
            <span className="block text-red-500 sm:inline">{state?.message}</span>
        </div>
      )}
      <div>
        <Label>Nome</Label>
        <Input type="text" name="name" placeholder="Fulano de Tal" />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" name="email" placeholder="eu@exemplo.com" />
      </div>
      <div>
        <Label>Senha</Label>
        <Input type="password" name="password" placeholder="********" />
      </div>
      <div>
        <Button disabled={isPending} className="w-full mt-6" type="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
