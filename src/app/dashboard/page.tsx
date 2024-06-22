"use server"
import { getAccountWithToken } from "@/api/services/account.service";
import Index from "@/components/dashboard/Index";


const Page = async () => {
    const account = await getAccountWithToken();
    console.log(account);
    return (
        <Index account={account} />
    )
}

export default Page;