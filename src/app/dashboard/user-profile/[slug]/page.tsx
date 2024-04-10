import { getAccountWithToken } from "@/api/services/account.service";
import Dashboard from "@/components/user-profile/dashboard";

const Page = async () => {
    const account = await getAccountWithToken();

    return (
        <Dashboard account={account} />
    )
}

export default Page;