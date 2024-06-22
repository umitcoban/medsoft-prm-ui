"use client"
import Account from "@/api/entities/account.entity";
import { UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { BsCalendarDate } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";

interface Props {
    account: Account | null;
}

const UserMenuItems: React.FC<Props> = ({ account }) => {
    const router = useRouter();
    const isAdmin = account?.roles.some(role => role.role === "ADMIN");
    const isDoctor = !isAdmin && account?.roles.some(role => role.role === "DOCTOR");
    const isUser = !isAdmin && isDoctor && account?.roles.some(role => role.role === "USER");

    let sideBarItems: MenuProps["items"] = []

    if (isAdmin)
        sideBarItems = [
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
                icon: <FaPeopleGroup />,
                label: 'Users',
                children: [
                    {
                        key: "4.1",
                        label: "Users",
                        onClick: () => router.push(`/dashboard/users`)
                    },
                    {
                        key: "4.2",
                        label: "New User",
                        onClick: () => router.push("/dashboard/users/new-user")
                    }
                ],
                disabled: isDoctor || isUser
            }
        ]
    else if (isDoctor)
        sideBarItems = [
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
                ],
                disabled: isAdmin
            }
        ]
    else if (isUser)
        sideBarItems = [
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
                ],
                disabled: isAdmin
            }
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