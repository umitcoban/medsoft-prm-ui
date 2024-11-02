"use client"

import Account from '@/api/entities/account.entity';
import useScreenHook from '@/hooks/useScreen';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { App, Avatar, Button, Divider, Layout, Popover, theme } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import MenuBarContent from '../UI/MenuBarContent';
import UserMenuItems from '../menu-items/userMenuItems';
const { Header, Sider, Content, Footer } = Layout;

interface PrimaryAppLayoutProps {
    children: ReactNode;
    account: Account | null
}

const PrimaryAppLayout = ({ children, account }: PrimaryAppLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const screenWidth = useScreenHook();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (screenWidth.isMobile)
            setCollapsed(true);
        else
            setCollapsed(false);
    }, [screenWidth])

    return (
        <App>
            <Layout className='h-screen w-screen !bg-light font-serif'>
                <Sider trigger={null} collapsible collapsed={collapsed} className='!bg-light' width={225}>
                    <div className="text-center justify-center items-center mx-auto">
                        <Image src={"/assets/logo/logo.png"} alt='MedSoft Logo' width={500} height={100} className='w-full' />
                    </div>
                    <Divider />
                    <UserMenuItems account={account} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <div className='flex flex-row w-full'>
                            <div className='justify-start items-start'>
                                {!screenWidth.isMobile && <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />}
                            </div>
                            <div className='flex flex-grow justify-end align-middle mx-auto me-12 gap-6'>
                                <div className='flex items-center align-middle gap-12'>
                                    <Popover content={<MenuBarContent account={account} />}>
                                        <Avatar size={50} src={"data:image/png;base64," + account?.photo}>{ }</Avatar>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflow: "auto"
                        }}
                    >
                        {children}
                    </Content>
                    <Footer className='text-center'>
                        MedSoft {dayjs().year()} © Ümit Yasin Çoban
                    </Footer>
                </Layout>
            </Layout>
        </App>
    );
}


export default PrimaryAppLayout;