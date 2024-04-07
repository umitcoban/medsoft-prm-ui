"use client"

import { Button } from "antd";
import { signIn } from "next-auth/react";

const SignInButton = () => {
    return (
        <Button size="large" type="primary" onClick={() => signIn("keycloak", {redirect: true, callbackUrl: "/"})}>Sign In!</Button>
    );
}

export default SignInButton;