import axiosInstance from "../axiostInstance";
import Department from "../entities/department.entity";

export const getDepartments = async (): Promise<Department[]> => {
    try {
        const response = await axiosInstance.get(`/departments/api`);
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