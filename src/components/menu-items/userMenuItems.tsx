"use client"
import Account from "@/api/entities/account.entity";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

interface Props {
    account: Account | null;
}

const UserMenuItems: React.FC<Props> = ({ account }) => {
    const router = useRouter();

    const sideBarItems: MenuProps["items"] = [
        {
            key: '1',
            icon: <MdOutlineDashboard />,
            label: 'Dashboard',
            onClick: () => router.push("/dashboard")
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'My Profile',
            onClick: () => router.push(`/dashboard/user-profile/${account?.id}`)
        },
        {
            key: '3',
            icon: <BsCalendarDate />,
            label: 'My Appointments',
            children: [
                {
                    key: "3.1",
                    label: "Active Appointments"
                },
                {
                    key: "3.2",
                    label: "Past Appointments"
                },
                {
                    key: "3.3",
                    label: "Canceled Appointments"
                }
            ]
        },
        {
            key: '4',
            icon: <UploadOutlined />,
            label: 'nav 3'
        },
    ]
    return (
        <Menu
            className='!bg-primary-bg-color !text-primary-text-color px-4'
            mode="inline"
            defaultSelectedKeys={['1']}
            items={sideBarItems}
        />
    );
}

export default UserMenuItems;