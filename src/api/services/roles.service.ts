import axiosInstance from "../axiostInstance";
import Role from "../entities/role.entity";


export const getAllRoles = async (): Promise<Role[] | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/roles");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}