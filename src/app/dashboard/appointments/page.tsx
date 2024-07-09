import { getAppointments } from "@/api/services/appointment.service";
import AppointmentList from "@/components/appointments/AppointmentTable";
import { Divider } from "antd";

const Page = async () => {
    const appointments = await getAppointments();

    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Appointments</h1>
                    <h4 className="text-primary-text-color text-xl mt-4">All appointments details here</h4>
                </div>
            </div>
            <Divider className="!text-primary-text-color" orientation="center" dashed />
            <div className="w-full text-center h-full">
                <AppointmentList appointments={appointments} />
            </div>
        </section>
    );
}

export default Page;
