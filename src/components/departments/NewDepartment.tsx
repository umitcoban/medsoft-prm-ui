"use client"

import Department from "@/api/entities/department.entity";
import { createDepartment } from "@/api/services/department.service";
import { App, Button, Divider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";



const NewDepartment : React.FC = () => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const router = useRouter();
    const onSubmitForm = async () => {
        const data: Partial<Department> = {
            name: form.getFieldValue("name"),
            description: form.getFieldValue("description"),
        };
        const response = await createDepartment(data);
        if (response) {
            notification.success({ message: response, closable: true, placement: "top" });
            setTimeout(() => {
                router.push("/dashboard/departments");
            }, 2500);
        } else {
            notification.error({ message: "Department creating error!", closable: true, placement: "top" });
        }
    }


    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Create New Department</h1>
                </div>
            </div>
            <Divider className="!text-primary-text-color" orientation="center" dashed />
            <Form form={form} layout="vertical" onFinish={onSubmitForm}>
                <section id="name-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Name: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid-flow-col">
                                    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name must be valid", type: "string" }]} >
                                        <Input title="Name" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="name-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Description: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid-flow-col">
                                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description must be valid", type: "string" }]}>
                                        <Input title="Description"  />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <div className="w-full flex justify-end items-end align-middle">
                    <Button className="w-[85px] !h-[85px] mx-auto font-semibold" type="primary" icon={<FaSave />} size="large" shape="circle" htmlType="submit">SAVE</Button>
                </div>
            </Form>
        </section>
    );
}

export default NewDepartment;