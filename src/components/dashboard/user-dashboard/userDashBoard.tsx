"use client"
import Account from "@/api/entities/account.entity";
import CardCalendar from "@/components/UI/cardCalendar";
import CardTable from "@/components/UI/cardTable";
import ProfileInfoCard from "@/components/UI/ProfileInfoCard";
import StatsCard from "@/components/UI/statsCard";
import TimelineCard from "@/components/UI/timelineCard";
import { dashboardLabReportTimelineItems, dashboardPrescriptionColumns, dashboardPrescriptionDataSource, dashboardUpcomingAppointmentColumns, dashboardUpcomingAppointmentDataSource } from "@/dummy-data/data";
import dayjs from "dayjs";

interface Props {
    account: Account | null
}

const UserDashBoard: React.FC<Props> = ({ account }) => {
    return (
        <div className="grid grid-cols-1 gap-y-1 lg:grid-cols-2 lg:gap-2 max-h-fit">
            <div className="text-center w-full">
                <ProfileInfoCard account={account} />
            </div>
            <section className="grid grid-cols-2 gap-2 shadow">
                <StatsCard cardTitle="Age" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.age)} suffix="year" />
                <StatsCard cardTitle="Weight" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.weight)} suffix="kg" />
                <StatsCard cardTitle="Height" statsTitle={`${dayjs(dayjs().diff(dayjs(account?.updatedAt))).day()} Days Ago`} value={String(account?.height)} suffix="cm" />
            </section>
            <section className="shadow">
                <CardTable cardTitle="Upcoming Appointments" columns={dashboardUpcomingAppointmentColumns} dataSource={dashboardUpcomingAppointmentDataSource} />
            </section>
            <section className="shadow">
                <CardCalendar cardTitle="Calendar" />
            </section>
            <section className="shadow">
                <TimelineCard cardTitle="Latest Lab Report" items={dashboardLabReportTimelineItems} mode="alternate" department="Biochemistry" />
            </section>
            <section className="shadow">
                <CardTable cardTitle="Last Prescription" columns={dashboardPrescriptionColumns} dataSource={dashboardPrescriptionDataSource} />
            </section>
        </div>
    );
}

export default UserDashBoard;