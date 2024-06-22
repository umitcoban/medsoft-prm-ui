"use client"
import Account, { PageableAccount } from "@/api/entities/account.entity";
import Role from "@/api/entities/role.entity";
import { getPageableAccountsWithToken, updateAccountRole } from "@/api/services/account.service";
import { getAllRoles } from "@/api/services/roles.service";
import { Avatar, message, Result, Select, Table, TableColumnsType } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

const UsersTable: React.FC = () => {
    const [pageableAccounts, setPageableAccounts] = useState<PageableAccount | null>(null);
    const [roles, setRoles] = useState<Role[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pageableAccount = await getPageableAccountsWithToken();
                setPageableAccounts(pageableAccount);
                const responseRoles = await getAllRoles();
                setRoles(responseRoles);
            } catch (error) {
                console.error("Error fetching accounts:", error);
                setPageableAccounts(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Result className="animate-pulse" status={"info"} title="Loading..." />;
    }

    if (!pageableAccounts) {
        return <Result status={"404"} title="Not Found" />;
    }

    const handleRoleSelect = async (ids: number[], userId: string) => {
        if (ids.length === 0)
            message.error({ type: "error", content: "Roles must be not empty" })
        else {
            const response = await updateAccountRole(ids, userId);
            if (response)
                message.success({ type: "success", content: "Roles updated successfully" });
            else
                message.error({ type: "error", content: "Failed to update roles" });
        }
    };

    const columns: TableColumnsType<Account> = [
        {
            title: 'Avatar',
            dataIndex: 'photo',
            render(value, record, index) {
                return <Avatar size={"large"} src={record.photo ? `data:image/png;base64,${record.photo}` : record.firstName.substring(1).toLocaleUpperCase()} />
            },
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
            showSorterTooltip: { title: 'Sort by First Name', placement: 'top' },
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            render(value, record, index) {
                return <Select
                    key={index}
                    className="w-full"
                    size="large"
                    options={roles?.map(role => { return { value: role.id, label: role.role } })}
                    defaultValue={record.roles?.map(role => role.id)}
                    onChange={(value: number[]) => handleRoleSelect(value, record.id)}
                    mode="multiple" />
            },
        },
        {
            title: 'Update',
            dataIndex: 'update',
            render(value, record, index) {
                return <Link href={`/dashboard/users/${record.id}`}>Update</Link>
            },
        },
    ];

    return (
        <Table
            dataSource={pageableAccounts.content}
            columns={columns}
            rowKey="id"
            pagination={{
                pageSize: pageableAccounts.size,
                current: pageableAccounts.number + 1,
                total: pageableAccounts.totalElements,
            }}
        />
    );
}

export default UsersTable;
