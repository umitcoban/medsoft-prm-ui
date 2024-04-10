import { Button, TableProps, TimelineItemProps } from "antd";
import { FaFilePdf } from "react-icons/fa";
import { TbProgress, TbProgressCheck } from "react-icons/tb";


export const dashboardLabReportTimelineItems: TimelineItemProps[] = [
    {
        key: "1",
        label: "Sample taken 14:00",
        dot: <TbProgressCheck size={19} />,
        style: {marginBottom: 38},
        color: "green"
    },
    {
        key: "2",
        label: "Sample arrived 14:15",
        dot: <TbProgressCheck size={19} />,
        style: {marginBottom: 38},
        color: "green"
    },
    {
        key: "3",
        label: "Sample is in progress 15:00",
        dot: <TbProgress size={19} />,
        pending: true,
        style: {marginBottom: 38},
        color: "blue"
    }
]

export const dashboardPrescriptionColumns: TableProps["columns"] = [
    {
        key: "1",
        title: "Deparment",
        dataIndex: "departmentName"
    },
    {
        key: "2",
        title: "Doctor",
        dataIndex: "doctorName"
    },
    {
        key: "3",
        title: "Download",
        dataIndex: "totalPrice",
        render(value, record, index) {
            return <div className="w-full text-center"><Button type="link" size="large" icon={<FaFilePdf size={30} />}></Button> </div>;
        },
    }
]

export const dashboardPrescriptionDataSource: TableProps["dataSource"] = [
    {
        key: 1,
        id: 1,
        departmentName: "Biology",
        totalPrice: 2450,
        doctorName: "John Buds"
    },
    {
        key: 2,
        id: 2,
        departmentName: "Cardiology",
        totalPrice: 8950,
        doctorName: "J. Frank Burden"
    },
    {
        key: 3,
        id: 3,
        departmentName: "Cardiology",
        totalPrice: 50,
        doctorName: "J. Frank Burden"
    }
]

export const dashboardUpcomingAppointmentColumns: TableProps["columns"] = [
    {
        key: "1",
        title: "Doctor",
        dataIndex: "doctorName"
    },
    {
        key: "2",
        title: "Department",
        dataIndex: "departmentName"
    },
    {
        key: "3",
        title: "Date",
        dataIndex: "date"
    },
    {
        key: "4",
        title: "Time",
        dataIndex: "time"
    }
]

export const dashboardUpcomingAppointmentDataSource: TableProps["dataSource"] = [
    {
        key: 1,
        id: 1,
        departmentName: "Cardiology",
        date: "15.04.2024",
        time: "10:35",
        doctorName: "J. Frank Burden"
    },
    {
        key: 1,
        id: 1,
        departmentName: "Microbiology",
        date: "20.06.2024",
        time: "14:10",
        doctorName: "Ümit Yasin Çoban"
    }
]