import UsersTable from "@/components/users/UsersTable";
import { Divider } from "antd";


const Page = () => {
    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Users</h1>
                    <h4 className="text-primary-text-color text-xl mt-4">All User personal details here</h4>
                </div>
            </div>
            <Divider className="!text-primary-text-color" orientation="center" dashed />
            <div className="w-full text-center h-full">
                <UsersTable />
            </div>
        </section>
    )
}

export default Page;