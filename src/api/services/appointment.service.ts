import axiosInstance from "../axiostInstance";
import Appointment, { AppointmentCreateDTO } from "../entities/appointment.entity";

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axiosInstance.get(`/appointments/api`);
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return [];
    }
}

export const createAppointment = async (department: AppointmentCreateDTO): Promise<String | null> => {
    try {
        const response = await axiosInstance.post(`/appointments/api`, {...department});
        return response.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}