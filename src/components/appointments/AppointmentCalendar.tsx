"use client"
import Account from '@/api/entities/account.entity';
import Appointment from '@/api/entities/appointment.entity';
import Department from '@/api/entities/department.entity';
import { Badge, Calendar, Modal, Select, SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

interface AppointmentCalendarProps {
    appointments: Appointment[];
    accounts: Account[];
    departments: Department[];
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ appointments, accounts, departments}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const accountSelectProps: SelectProps["options"] = accounts.map(acc => {return {label: acc.firstName + " " + acc.lastName, value: acc.id}});
    const departmentsSelectProps: SelectProps["options"] = departments.map(item => {return {label: item.description, value: item.id}});
    const getListData = (value: Dayjs) => {
        const date = value.format('YYYY-MM-DD');
        return appointments.filter(app => dayjs(app.date).format('YYYY-MM-DD') === date);
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.id}>
                        <Badge status="success" text={`${item.time} - ${item.patient.firstName} ${item.patient.lastName}`} />
                    </li>
                ))}
            </ul>
        );
    };

    const onCalenderSelectHandler = (date: Dayjs) => {
        setIsModalOpen(true);
    }

    return (
        <div className='w-full h-full'>
            <Modal
                title="Create New Appointment"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(!isModalOpen)}>
                    <div className='w-full space-y-3'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Patient: </label>
                            <Select options={accountSelectProps} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Department: </label>
                            <Select options={departmentsSelectProps} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Doctor:</label>
                            <Select options={accountSelectProps} />
                        </div>
                    </div>
            </Modal>
            <Calendar dateCellRender={dateCellRender} onSelect={onCalenderSelectHandler} />
        </div>
    );
};

export default AppointmentCalendar;
