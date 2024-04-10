"use client"

import Account from "@/api/entities/account.entity";
import UserDashBoard from "./user-dashboard/userDashBoard";


interface Props {
    account: Account | null;
}

const Index: React.FC<Props> = ({ account }) => {
    return (
        <UserDashBoard account={account} />
    )
}

export default Index;