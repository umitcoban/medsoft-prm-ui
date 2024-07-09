"use client"
import Account from '@/api/entities/account.entity';
import ProfileInfoCard from "@/components/UI/ProfileInfoCard";
import StatsCard from "@/components/UI/statsCard";
import useScreenHook from '@/hooks/useScreen';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import AccountChart from "./AccountChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
    account: Account | null;
    accountAnalytic: AccountAnalytic | null;
}

const AdminDashboard: React.FC<Props> = ({ account, accountAnalytic }) => {
    const [layout, setLayout] = useState<Layout[]>([
        { i: 'todayCount', x: 0, y: 0, w: 1, h: 1 },
        { i: 'monthCount', x: 1, y: 0, w: 1, h: 1 },
        { i: 'yearCount', x: 2, y: 0, w: 1, h: 1 },
        { i: 'totalCount', x: 3, y: 0, w: 1, h: 1 },
        { i: 'adminCount', x: 0, y: 1, w: 1, h: 1 },
        { i: 'doctorCount', x: 1, y: 1, w: 1, h: 1 },
        { i: 'userCount', x: 2, y: 1, w: 1, h: 1 },
        { i: 'pieChart', x: 0, y: 2, w: 2, h: 2 },
        { i: 'barChart', x: 2, y: 2, w: 2, h: 2 }
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const { isMobile } = useScreenHook();

    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboard-layout');
        if (savedLayout) {
            setLayout(JSON.parse(savedLayout));
        }
    }, []);

    const handleLayoutChange = (newLayout: Layout[]) => {
        if (isEditing) {
            setLayout(newLayout);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveLayout = () => {
        localStorage.setItem('dashboard-layout', JSON.stringify(layout));
        setIsEditing(false);
    };

    return (
        <div>
            {!isMobile && (
                <div className="text-right space-x-4">
                    <Button onClick={toggleEdit}>
                        {isEditing ? 'Cancel' : 'Edit Layout'}
                    </Button>
                    {isEditing && (
                        <Button onClick={saveLayout}>
                            Save Layout
                        </Button>
                    )}
                </div>
            )}
            <div className="text-center w-full">
                <ProfileInfoCard account={account} />
            </div>
            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: layout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
                rowHeight={200}
                onLayoutChange={handleLayoutChange}
                isDraggable={isEditing}
                isResizable={isEditing}
                compactType={null}
                preventCollision={true}
            >
                <div key="todayCount" className="grid-item">
                    <StatsCard cardTitle="Today Registered User Count" statsTitle="" value={accountAnalytic?.accountsCount.today_count} suffix="piece" />
                </div>
                <div key="monthCount" className="grid-item">
                    <StatsCard cardTitle="This Month Registered User Count" statsTitle="" value={accountAnalytic?.accountsCount.month_count} suffix="piece" />
                </div>
                <div key="yearCount" className="grid-item">
                    <StatsCard cardTitle="This Year Registered User Count" statsTitle="" value={accountAnalytic?.accountsCount.year_count} suffix="piece" />
                </div>
                <div key="totalCount" className="grid-item">
                    <StatsCard cardTitle="Total User Count" statsTitle="" value={accountAnalytic?.accountsCount.total_count} suffix="piece" />
                </div>
                <div key="adminCount" className="grid-item">
                    <StatsCard cardTitle="Admin User Count" statsTitle="" value={accountAnalytic?.accountsCount.admin_count} suffix="piece" />
                </div>
                <div key="doctorCount" className="grid-item">
                    <StatsCard cardTitle="Doctor User Count" statsTitle="" value={accountAnalytic?.accountsCount.doctor_count} suffix="piece" />
                </div>
                <div key="userCount" className="grid-item">
                    <StatsCard cardTitle="Patient User Count" statsTitle="" value={accountAnalytic?.accountsCount.user_count} suffix="piece" />
                </div>
                <div key="pieChart" className="grid-item">
                    <AccountChart data={accountAnalytic} chartType="pie" chartDataKey="role" />
                </div>
                <div key="barChart" className="grid-item">
                    <AccountChart data={accountAnalytic} chartType="bar" chartDataKey="date" />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default AdminDashboard;
