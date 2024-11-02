import axiosInstance from "../axiostInstance";
import Account, { PageableAccount } from "../entities/account.entity";
import ApiResponse from "../entities/api-response.entity";


export const getAccounts= async (): Promise<Account[] | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const getAccountsWithDepartmentName= async (department: string): Promise<Account[] | null> => {
    try {
        const response = await axiosInstance.get(`/accounts/api//findByDepartmentName?department=${department}`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const getAccountWithToken = async (): Promise<Account | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/myAccount");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error" , error);
        return null;
    }
}

export const getAccountWithId = async (id: string): Promise<Account | null> => {
    try {
        const response = await axiosInstance.get(`/accounts/api/${id}`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const getPageableAccountsWithToken = async (page?: number, size?: number): Promise<PageableAccount | null> => {
    try {
        const response = await axiosInstance.get(`/accounts/api/findAllAccount?${page ? "page=" +page : "page=0"}&${size ? "size=" + size : "size=10"}`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const getAccountsAdminAccountAnalyticsCounts = async (): Promise<AccountAnalytic | null> => {
    try {
        const response = await axiosInstance.get("/accounts/api/analytics/counts");
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const createAccount = async (account: Partial<Account>): Promise<ApiResponse<string> | null> => {
    try {
        const response = await axiosInstance.post("/accounts/api", { ...account });
        return response.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const updateAccountWithToken = async (account: Partial<Account>): Promise<Account | null> => {
    try {
        const response = await axiosInstance.put("/accounts/api", { ...account });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const updateAccountWithId = async (account: Partial<Account>, id: string): Promise<Account | null> => {
    try {
        const response = await axiosInstance.put(`/accounts/api/${id}`, { ...account });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const updateAccountRole = async (ids: number[], id: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/${id}/updateRole`, { ids });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const updateAccountDepartment = async (departmentId: number, userId: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/assignDepartment`, { departmentId, userId });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const updateAccountPassword = async (id: string, password: string): Promise<boolean | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/${id}/changePassword`, { password });
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}

export const logoutAccountWithToken= async (): Promise<string | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/logout`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}


export const verifyEmail= async (code: string): Promise<string | null> => {
    try {
        const response = await axiosInstance.post(`/accounts/api/verifyEmail?code=${code}`);
        return response.data.data;
    } catch (error) {
        console.log("getAccountWithToken error", error);
        return null;
    }
}