import Account from "./account.entity";
import Department from "./department.entity";

export enum AppointmentStatusEnum {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELED = "CANCELED",
    COMPLETED = "COMPLETED",
}

export default interface Appointment{
    id: number;
    date: Date;
    time: string;
    patient: Account;
    doctor: Account;
    status: AppointmentStatusEnum;
    department: Department;
}

export interface AppointmentCreateDTO{
    patientId: string;
    doctorId: string;
    date: Date;
    time: string;
    departmentId: number;    
}