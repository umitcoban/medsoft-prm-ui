"use client"

import Account from "@/api/entities/account.entity";
import MyDetails from "./my-details/myDetailsPage";

interface Props{
    account: Account | null;
}

const Dashboard: React.FC<Props> = ({account}) => {
    return (
        <MyDetails account={account} />
    )
}

export default Dashboard;