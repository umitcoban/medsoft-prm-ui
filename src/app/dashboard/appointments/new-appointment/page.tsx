import { getAccounts, getAccountWithToken } from "@/api/services/account.service";
import { getAppointments } from "@/api/services/appointment.service";
import { getDepartments } from "@/api/services/department.service";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import { Result } from "antd";

const Page = async () => {
    const account = await getAccountWithToken();
    const departments = await getDepartments();
    if(!account)
        return <Result status="warning" />

    const isAdmin = account?.roles.some(role => role.role === "ADMIN" || role.role === "MANAGER");

    let accounts;
    let appointments = await getAppointments();

    if(isAdmin)
        accounts = await getAccounts()
    else 
        accounts = [{...account}]

    if(!accounts)
        return <Result status="warning" />

    return(
        <AppointmentCalendar accounts={accounts} appointments={appointments} departments={departments} />
    )

}

export default Page;