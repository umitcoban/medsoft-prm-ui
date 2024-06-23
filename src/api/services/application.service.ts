import axiosInstance from "../axiostInstance";

export const getApplicationHealthCheck = async (): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.get(`/actuator/health`);
        return true;
    } catch (error) {
        return null;
    }
}