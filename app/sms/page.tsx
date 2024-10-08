"use client";

import Input from "../components/input";
import Button from "../components/button";
import SocialLogin from "../components/social-login";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = { token: false, error: undefined };

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            type="number"
            placeholder="Verification code"
            required
            name="token"
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
            key="number"
          />
        ) : (
          <Input
            type="number"
            placeholder="Phone number"
            required
            name="phone"
            errors={state.error?.formErrors}
            key="phone"
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
      <SocialLogin />
    </div>
  );
}
