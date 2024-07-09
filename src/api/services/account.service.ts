import axiosInstance from "../axiostInstance";
import Account, { PageableAccount } from "../entities/account.entity";


export const getAccounts= async (): Promise<Account[] | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const getAccountWithToken = async (): Promise<Account | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/myAccount");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const getAccountWithId = async (id: string): Promise<Account | null> => {
    try {
        const response = await axiosInstance.get(`/accounts/api/${id}`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const getPageableAccountsWithToken = async (): Promise<PageableAccount | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/findAllAccount");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const getAccountsAdminAccountAnalyticsCounts = async (): Promise<AccountAnalytic | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/analytics/counts");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const createAccount = async (account: Partial<Account>): Promise<Account | null> => {
    try {
        const response = await axiosInstance.post("/accounts/api", { ...account });
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

export const updateAccountWithId = async (account: Partial<Account>, id: string): Promise<Account | null> => {
    try {
        const response = await axiosInstance.put(`/accounts/api/${id}`, { ...account });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const updateAccountRole = async (ids: number[], id: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/${id}/updateRole`, { ids });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const updateAccountDepartment = async (departmentId: number, userId: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/assignDepartment`, { departmentId, userId });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

export const updateAccountPassword = async (id: string, password: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/${id}/changePassword`, { password });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error");
        return null;
    }
}

