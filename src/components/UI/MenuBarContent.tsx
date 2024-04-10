"use client"
import Account from "@/api/entities/account.entity";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { signOut } from "next-auth/react";

interface Props {
    account: Account | null
}

const MenuBarContent: React.FC<Props> = ({ account }: Props) => {
    return (
        <div className="grid grid-cols-1">
            <div className="w-full">
                <h1 className="text-primary-header-color text-lg font-semibold">{`Welcome to ${account?.firstName} ${account?.lastName}`}</h1>
            </div>
            <Divider />
            <div className="w-full text-center">
                <Button icon={<LogoutOutlined />} type="primary" onClick={() => signOut({ redirect: true, callbackUrl: "/sign-in" })}>Logout</Button>
            </div>

        </div>
    )
}

export default MenuBarContent;