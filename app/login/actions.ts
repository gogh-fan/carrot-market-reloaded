"use server";

import { redirect } from "next/navigation";
import { LoginFormScheme, loginPasswordScheme } from "./loginZod";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await LoginFormScheme.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const ok = await loginPasswordScheme.safeParseAsync({
      email: result.data.email,
      password: result.data.password,
    });
    if (ok.success) redirect("/profile");
    else return ok.error?.flatten();
  }
}
