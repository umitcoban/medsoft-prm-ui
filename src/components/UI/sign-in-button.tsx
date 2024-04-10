"use client"

import { Button } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface Props {
    className?: string
}

const SignInButton: React.FC<Props> = ({ className }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Button
            className={`${className}`}
            type="primary"
            onClick={() => {
                signIn("keycloak", { redirect: true, callbackUrl: "/" });
                setIsLoading(true);
            }}
            loading={isLoading}>Sign In!</Button>
    );
}

export default SignInButton;