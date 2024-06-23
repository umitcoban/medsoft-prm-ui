import { getAccountWithId } from "@/api/services/account.service";
import UserSettings from "@/components/user-profile/settings/UserSettings";

const Page = async ({ params }: { params: { slug: string } }) => {
    var account = await getAccountWithId(params.slug);
    return (
        <UserSettings account={account} />
    );

}


export default Page;