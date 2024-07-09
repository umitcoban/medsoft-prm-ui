import axiosInstance from "../axiostInstance";
import Appointment from "../entities/appointment.entity";
import Department from "../entities/department.entity";

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axiosInstance.get(`/appointments/api`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return [];
    }
}

export const createDepartment = async (department: Partial<Department>): Promise<String | null> => {
    try {
        const response = await axiosInstance.post(`/departments/api`, {...department});
        return response.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}