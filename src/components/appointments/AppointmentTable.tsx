"use client"
import Account from '@/api/entities/account.entity';
import Appointment from '@/api/entities/appointment.entity';
import Department from '@/api/entities/department.entity';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React from 'react';
import { AppointmentStatusEnum } from '../../api/entities/appointment.entity';

interface AppointmentListProps {
    appointments: Appointment[];
}

const columns: ColumnsType<Appointment> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Patient',
        dataIndex: 'patient',
        key: 'patient',
        render: (patient: Account) => `${patient.firstName} ${patient.lastName}`,
    },
    {
        title: 'Doctor',
        dataIndex: 'doctor',
        key: 'doctor',
        render: (doctor: Account) => `${doctor.firstName} ${doctor.lastName}`,
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (department: Department) => department.name,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: AppointmentStatusEnum) => status,
    },
];

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
    return (
        <Table
            dataSource={appointments}
            columns={columns}
            rowKey="id"
        />
    );
};

export default AppointmentList;
