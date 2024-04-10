import axiosInstance from "../axiostInstance";
import Account from "../entities/account.entity";


export const getAccountWithToken = async (): Promise<Account | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/findAccountById");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const getAccountsWithToken = async (): Promise<Account[] | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/findAllAccount");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const updateAccountWithToken = async (account: Partial<Account>): Promise<Account | null> => {
    try {
        const response = await axiosInstance.put("/accounts/api", { ...account });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}