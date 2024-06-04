import Account from "@/api/entities/account.entity";
import UserDashBoard from "./user-dashboard/userDashBoard";
import AdminDashboard from "./admin-dashboard/adminDashBoard";


interface Props {
    account: Account | null;
}

const Index: React.FC<Props> = async ({ account }) => {
    const isAdmin = account?.roles.some(role => role.role === "ADMIN");
    const isDoctor = !isAdmin && account?.roles.some(role => role.role === "DOCTOR");
    const isUser = !isAdmin && isDoctor && account?.roles.some(role => role.role === "USER");
    return (
        <section>
            {isAdmin && <AdminDashboard account={account} />}
            {isUser && <UserDashBoard account={account} />}
        </section>
    )
}

export default Index;