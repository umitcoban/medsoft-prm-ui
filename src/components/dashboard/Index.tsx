import Account from "@/api/entities/account.entity";
import { getAccountsAdminAccountAnalyticsCounts } from "@/api/services/account.service";
import AdminDashboard from "./admin-dashboard/adminDashBoard";
import UserDashBoard from "./user-dashboard/userDashBoard";


interface Props {
    account: Account | null;
}

const Index: React.FC<Props> = async ({ account }) => {
    const isAdmin = account?.roles.some(role => role.role === "ADMIN");
    const isDoctor = !isAdmin && account?.roles.some(role => role.role === "DOCTOR");
    const isUser = !isAdmin && !isDoctor && account?.roles.some(role => role.role === "USER");
    const accountAnalytic = await getAccountsAdminAccountAnalyticsCounts();
    return (
        <section>
            {isAdmin && <AdminDashboard account={account} accountAnalytic={accountAnalytic}/>}
            {isUser && <UserDashBoard account={account} />}
        </section>
    )
}

export default Index;