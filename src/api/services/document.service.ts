import axiosInstance from "../axiostInstance";

export const getProfilePhotoWithUserId = async (userId: string): Promise<string | null> => {
    try {
        const response = await axiosInstance.get("/documents/api/photos/profile/" + userId);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}