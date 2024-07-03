"use client"
import Department from "@/api/entities/department.entity";
import { getDepartments } from "@/api/services/department.service";
import { Result, Table, TableColumnsType } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

const DepartmentsTable: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDepartments();
                setDepartments(result);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Result className="animate-pulse" status={"info"} title="Loading..." />;
    }

    if (!departments) {
        return <Result status={"404"} title="Not Found" />;
    }


    const columns: TableColumnsType<Department> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            showSorterTooltip: { title: 'Sort by Name', placement: 'top' },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
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
            dataSource={departments}
            columns={columns}
            rowKey="id"
        />
    );
}

export default DepartmentsTable;
