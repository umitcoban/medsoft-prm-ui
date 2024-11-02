"use server"
import { getAccountWithToken } from "@/api/services/account.service";
import Index from "@/components/dashboard/Index";
import { redirect } from "next/navigation";


const Page = async () => {
    const account = await getAccountWithToken();
    if(!account)
        redirect("/sign-in")
    return (
        <Index account={account} />
    )
}

export default Page;