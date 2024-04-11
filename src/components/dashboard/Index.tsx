import Account from "@/api/entities/account.entity";
import UserDashBoard from "./user-dashboard/userDashBoard";


interface Props {
    account: Account | null;
}

const Index: React.FC<Props> = async ({ account }) => {
    
    return (
        <section>
            <p>NAME: {account ? account.firstName : ""}</p>
            <p>ROLES: {account ? account.roles.map(val => val.role) : ""}</p>
            <UserDashBoard account={account} />
        </section>
    )
}

export default Index;