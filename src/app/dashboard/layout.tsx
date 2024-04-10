import { getAccountWithToken } from "@/api/services/account.service";
import PrimaryAppLayout from "@/components/layout/PrimaryAppLayout";
import { FC, ReactNode } from "react";


const AppLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const account = await getAccountWithToken();
    return (
        <PrimaryAppLayout account={account}>
            {children}
        </PrimaryAppLayout>
    )
};

export default AppLayout;