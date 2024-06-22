import { getAccountWithId } from "@/api/services/account.service";
import UpdateUser from "@/components/users/UpdateUser";

export default async function Page({ params }: { params: { id: string } }) {
    const account = await getAccountWithId(params.id);
    return (
        <UpdateUser account={account}/>
    );
}