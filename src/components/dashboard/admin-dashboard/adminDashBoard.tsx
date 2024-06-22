

import Account from "@/api/entities/account.entity";
import { getAccountsAdminAccountAnalyticsCounts } from "@/api/services/account.service";
import ProfileInfoCard from "@/components/UI/ProfileInfoCard";
import StatsCard from "@/components/UI/statsCard";
import AccountChart from "./AccountChart";

interface Props {
    account: Account | null
}

const AdminDashboard: React.FC<Props> = async ({ account }) => {
    const accountAnalytic: AccountAnalytic | null = await getAccountsAdminAccountAnalyticsCounts();
    return (
        <div>
            <div className="text-center w-full">
                <ProfileInfoCard account={account} />
            </div>
            <div className="grid grid-cols-1 gap-y-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 max-h-fit">
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="Today Registered User Count" statsTitle={``} value={accountAnalytic?.accountsCount.today_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="This Month Registered User Count" statsTitle={``} value={accountAnalytic?.accountsCount.month_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="This Year Registered User Count" statsTitle={``} value={accountAnalytic?.accountsCount.year_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="Total User Count" statsTitle={``} value={accountAnalytic?.accountsCount.total_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="Admin User Count" statsTitle={``} value={accountAnalytic?.accountsCount.admin_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="Doctor User Count" statsTitle={``} value={accountAnalytic?.accountsCount.doctor_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <StatsCard cardTitle="Patient User Count" statsTitle={``} value={accountAnalytic?.accountsCount.user_count} suffix="piece" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <AccountChart data={accountAnalytic} chartType="pie" chartDataKey="date" />
                </div>
                <div className="grid grid-cols-1 shadow">
                    <AccountChart data={accountAnalytic} chartType="bar" chartDataKey="role" />
                </div>
            </div>
        </div>
    )
}


export default AdminDashboard;