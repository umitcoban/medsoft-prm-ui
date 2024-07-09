"use client"
import Account from '@/api/entities/account.entity';
import CardCalendar from "@/components/UI/cardCalendar";
import CardTable from "@/components/UI/cardTable";
import ProfileInfoCard from "@/components/UI/ProfileInfoCard";
import StatsCard from "@/components/UI/statsCard";
import TimelineCard from "@/components/UI/timelineCard";
import {
    dashboardLabReportTimelineItems,
    dashboardPrescriptionColumns,
    dashboardPrescriptionDataSource,
    dashboardUpcomingAppointmentColumns,
    dashboardUpcomingAppointmentDataSource
} from "@/dummy-data/data";
import useScreenHook from '@/hooks/useScreen';
import { Button } from 'antd';
import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
    account: Account | null;
}

const UserDashBoard: React.FC<Props> = ({ account }) => {
    const [layout, setLayout] = useState<Layout[]>(
        [
            {
                w: 1,
                h: 1,
                x: 0,
                y: 0,
                i: "ageStats",
                moved: false,
                static: false
            },
            {
                w: 1,
                h: 1,
                x: 1,
                y: 0,
                i: "weightStats",
                moved: false,
                static: false
            },
            {
                w: 1,
                h: 1,
                x: 2,
                y: 0,
                i: "heightStats",
                moved: false,
                static: false
            },
            {
                w: 2,
                h: 2,
                x: 0,
                y: 1,
                i: "upcomingAppointments",
                moved: false,
                static: false
            },
            {
                w: 2,
                h: 2,
                x: 2,
                y: 1,
                i: "calendar",
                moved: false,
                static: false
            },
            {
                w: 2,
                h: 2,
                x: 0,
                y: 3,
                i: "latestLabReport",
                moved: false,
                static: false
            },
            {
                w: 2,
                h: 2,
                x: 0,
                y: 5,
                i: "lastPrescription",
                moved: false,
                static: false
            }
        ]
    );

    const [isEditing, setIsEditing] = useState(false);
    const { isMobile } = useScreenHook();

    useEffect(() => {
        const savedLayout = localStorage.getItem('user-dashboard-layout');
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
        localStorage.setItem('user-dashboard-layout', JSON.stringify(layout));
        setIsEditing(false);
    };

    return (
        <div>
            {!isMobile && (
                <div className="text-right mb-4 space-x-4">
                    <Button onClick={toggleEdit} >
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
                <div key="ageStats" className="grid-item">
                    <StatsCard cardTitle="Age" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.age)} suffix="year" />
                </div>
                <div key="weightStats" className="grid-item">
                    <StatsCard cardTitle="Weight" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.weight)} suffix="kg" />
                </div>
                <div key="heightStats" className="grid-item">
                    <StatsCard cardTitle="Height" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.height)} suffix="cm" />
                </div>
                <div key="upcomingAppointments" className="grid-item">
                    <CardTable cardTitle="Upcoming Appointments" columns={dashboardUpcomingAppointmentColumns} dataSource={dashboardUpcomingAppointmentDataSource} />
                </div>
                <div key="calendar" className="grid-item">
                    <CardCalendar cardTitle="Calendar" />
                </div>
                <div key="latestLabReport" className="grid-item">
                    <TimelineCard cardTitle="Latest Lab Report" items={dashboardLabReportTimelineItems} mode="alternate" department="Biochemistry" />
                </div>
                <div key="lastPrescription" className="grid-item">
                    <CardTable cardTitle="Last Prescription" columns={dashboardPrescriptionColumns} dataSource={dashboardPrescriptionDataSource} />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default UserDashBoard;
