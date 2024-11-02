"use client"
import Account from "@/api/entities/account.entity";
import { logoutAccountWithToken } from "@/api/services/account.service";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    account: Account | null
}

const MenuBarContent: React.FC<Props> = ({ account }: Props) => {
    const router = useRouter();
    return (
        <div className="grid grid-cols-1">
            <div className="w-full">
                <h1 className="text-primary-header-color text-lg font-semibold">{`Welcome to ${account?.firstName} ${account?.lastName}`}</h1>
            </div>
            <Divider />
            <div className="w-full text-center grid grid-cols-1">
                <Button type="link" size="large" onClick={() => router.push(`/dashboard/user-profile/${account?.id}`)}>Profile</Button>
                <Button type="link" size="large" onClick={() => router.push(`/dashboard/user-profile/${account?.id}/settings`)}>Settings</Button>
            </div>
            <Divider />
            <div className="w-full text-center">
                <Button icon={<LogoutOutlined />} type="primary" onClick={async () => {
                    await logoutAccountWithToken();
                    signOut({ redirect: true, callbackUrl: "/sign-in" });
                    }}>Logout</Button>
            </div>

        </div>
    )
}

export default MenuBarContent;