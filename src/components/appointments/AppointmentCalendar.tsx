"use client"
import Account from '@/api/entities/account.entity';
import Appointment, { AppointmentCreateDTO } from '@/api/entities/appointment.entity';
import Department from '@/api/entities/department.entity';
import { getAccountsWithDepartmentName } from '@/api/services/account.service';
import { createAppointment } from '@/api/services/appointment.service';
import { App, Badge, Calendar, Form, Modal, Select, SelectProps, TimePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AppointmentCalendarProps {
    appointments: Appointment[];
    accounts: Account[];
    departments: Department[];
}

const isTimeDisabled = (selectedDate: Dayjs | null) => {
    const now = selectedDate ? selectedDate : dayjs();
    const startHour = 9;
    const endHour = 17;

    return {
        disabledHours: () => {
            const hours = [];
            for (let i = 0; i < 24; i++) {
                if (i < startHour || i >= endHour) {
                    hours.push(i);
                }
                if (i < now.hour() && now.isSame(dayjs(), 'day')) {
                    hours.push(i);
                }
            }
            return hours;
        },
        disabledMinutes: (selectedHour: number) => {
            if (selectedHour === now.hour()) {
                const minutes = [];
                for (let i = 0; i < 60; i++) {
                    if (i < now.minute()) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
            return [];
        }
    };
};


const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ appointments, accounts, departments }) => {
    const router = useRouter();
    const [form] = useForm();
    const {message} = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPatient, setSelectedPatient] = useState<number | null>();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [doctorSelectProps, setDoctorSelectProps] = useState<SelectProps["options"]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>();
    const accountSelectProps: SelectProps["options"] = accounts.map(acc => { return { label: acc.firstName + " " + acc.lastName, value: acc.id } });
    const departmentsSelectProps: SelectProps["options"] = departments.map(item => { return { label: item.description, value: item.id } });

    useEffect(() => {
        const fetchAccountsWithDepartment = async () => {
            const response = await getAccountsWithDepartmentName(departments.find(dept => dept.id === selectedDepartment)?.name || "");
            if (response)
                setDoctorSelectProps(response.map(acc => { return { label: acc.firstName + " " + acc.lastName, value: acc.id } }));
        }
        if (selectedDepartment)
            fetchAccountsWithDepartment();
    }, [selectedDepartment, departments]);

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
        console.log(date.toDate())
        if (date.isSame(dayjs(), "dates") || date.isAfter(dayjs(), "dates")) {
            setIsModalOpen(true);
            setSelectedDate(date);
        }
    }

    const onConfirmAppointment = async () => {
        const data: AppointmentCreateDTO = { ...form.getFieldsValue(), date: selectedDate?.format("YYYY-MM-DD").toString(), time: dayjs(form.getFieldValue("time")).format("HH:mm").toString() };
        const response = await createAppointment(data);
        if(response){
            message.success("Appointment created successfully");
            setTimeout(() => {
                router.push("/dashboard/appointments")
            }, 1500)
        } else{
            message.error("Failed to create appointment");
        }
    }

    return (
        <div className='w-full h-full'>
            <Modal
                title="Create New Appointment"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(!isModalOpen)}
                onOk={onConfirmAppointment}>
                <Form form={form}>
                    <div className='w-full space-y-3'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Patient: </label>
                            <Form.Item name={"patientId"} required rules={[{ type: "string", message: "Patient must be valid" }]}>
                                <Select options={accountSelectProps} />
                            </Form.Item>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Department: </label>
                            <Form.Item name={"departmentId"} required rules={[{ type: "number", message: "Department must be not empty" }]}>
                                <Select options={departmentsSelectProps} onChange={(val) => setSelectedDepartment(val)} />
                            </Form.Item>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Doctor:</label>
                            <Form.Item name={"doctorId"} required rules={[{ type: "string", message: "Doctor must be not empty" }]}>
                                <Select options={doctorSelectProps} />
                            </Form.Item>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold'>Select Time:</label>
                            <Form.Item name={"time"} required rules={[{ type: "date", message: "Time must be not empty" }]}>
                                <TimePicker format={"HH:mm"} minuteStep={10} disabledTime={(date) => isTimeDisabled(selectedDate)} variant='outlined' needConfirm />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
            <Calendar cellRender={dateCellRender} onSelect={onCalenderSelectHandler} disabledDate={(date) => date.isBefore(dayjs(), 'dates') && !date.isSame(dayjs(), "dates")} mode='month' />
        </div>
    );
};

export default AppointmentCalendar;
