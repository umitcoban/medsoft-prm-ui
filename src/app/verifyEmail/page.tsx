"use client"

import { verifyEmail } from "@/api/services/account.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            if (searchParams) {
                console.log(searchParams);
                const verifyCode = searchParams.get("code");
                if (verifyCode) {
                    const response = await verifyEmail(verifyCode);
                    if (response) {
                        router.push("/dashboard");
                    }
                } else {
                    router.push("/sign-in");
                }
            } else {
                router.push("/sign-in");
            }
        };
        fetch();
    }, [searchParams, router]);

    return null;
}

export default Page;
