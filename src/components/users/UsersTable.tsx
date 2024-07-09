"use client"
import Account, { PageableAccount } from "@/api/entities/account.entity";
import Department from "@/api/entities/department.entity";
import Role from "@/api/entities/role.entity";
import { getPageableAccountsWithToken, updateAccountDepartment, updateAccountRole } from "@/api/services/account.service";
import { getDepartments } from "@/api/services/department.service";
import { getAllRoles } from "@/api/services/roles.service";
import { Avatar, message, Result, Select, Table, TableColumnsType } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

const UsersTable: React.FC = () => {
    const [pageableAccounts, setPageableAccounts] = useState<PageableAccount | null>(null);
    const [roles, setRoles] = useState<Role[] | null>([]);
    const [departments, setDepartments] = useState<Department[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pageableAccount = await getPageableAccountsWithToken();
                setPageableAccounts(pageableAccount);
                const responseRoles = await getAllRoles();
                setRoles(responseRoles);
                const responseDepartments = await getDepartments();
                setDepartments(responseDepartments);

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

    const handleDepartmentSelect = async (ids: number[], userId: string) => {
        if (ids.length === 0)
            message.error({ type: "error", content: "Departments must be not empty" })
        else {
            const response = await updateAccountDepartment(ids[0], userId);
            if (response)
                message.success({ type: "success", content: "Departments updated successfully" });
            else
                message.error({ type: "error", content: "Failed to update departments" });
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
            title: 'Departments',
            dataIndex: 'departments',
            render(value, record, index) {
                return record.roles.find((role) => role.role.includes("DOCTOR")) && <Select
                    key={index}
                    className="w-full"
                    size="large"
                    options={departments?.map(department => { return { value: department.id, label: department.description } })}
                    defaultValue={record.departments?.map(department => department.id)}
                    onChange={(value: number[]) => handleDepartmentSelect(value, record.id)}
                    mode="multiple" />
            }
        },
        {
            title: 'Actions',
            dataIndex: 'update',
            render(value, record, index) {
                return (
                    <div className="flex space-x-2">
                        <Link href={`/dashboard/users/${record.id}`}>Update</Link>
                        <Link href={`/dashboard/user-profile/${record.id}/settings`}>Change Password</Link>
                    </div>
                );
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
