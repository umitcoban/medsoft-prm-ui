"use client"
import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";
import SessionLoader from "../loader/SessionLoader";

interface Props {
    children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        },
    });

    if (session.status === "loading") return <SessionLoader />

    return (
        <main>
            {children}
        </main>
    )
}

export default AuthProvider;