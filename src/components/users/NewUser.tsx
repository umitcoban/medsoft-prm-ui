"use client"

import Account from "@/api/entities/account.entity";
import { createAccount } from "@/api/services/account.service";
import { App, Button, DatePicker, Divider, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";



const NewUser : React.FC = () => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const router = useRouter();
    const onSubmitForm = async () => {
        const data: Partial<Account> = {
            birthDate: form.getFieldValue("birthDate"),
            email: form.getFieldValue("email"),
            firstName: form.getFieldValue("firstName"),
            lastName: form.getFieldValue("lastName"),
            height: form.getFieldValue("height"),
            weight: form.getFieldValue("weight"),
            phone: form.getFieldValue("phone"),
            password: form.getFieldValue("password"),
        };
        const response = await createAccount(data);
        if (response) {
            notification.success({ message: "Account settings successfully created!", closable: true, placement: "top" });
            setTimeout(() => {
                router.push("/dashboard/users");
            }, 2500);
        } else {
            notification.error({ message: "Account creating error!", closable: true, placement: "top" });
        }
    }


    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Create New User</h1>
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
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid-flow-col">
                                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First name must be valid", type: "string" }]} >
                                        <Input title="First Name" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-col">
                                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last name must be valid", type: "string" }]}>
                                        <Input title="Last Name"  />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="communication-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Communication: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid-flow-row">
                                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email name must be valid", type: "email" }]}>
                                        <Input title="Email" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-row">
                                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Phone name must be valid", type: "string" }]}>
                                        <Input title="Phone" name="phone" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="password-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Password: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1">
                                <div className="grid-flow-col">
                                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password name must be valid", type: "string" }]} >
                                        <Input title="password" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="age-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Age: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid-flow-row">
                                    <Form.Item label="BirthDate" name="birthDate" rules={[{ required: true, message: "Birth date name must be valid", type: "date" }]}>
                                        <DatePicker name="birthDate" maxDate={dayjs()} size="large" mode="date" />
                                    </Form.Item>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="body-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Body: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid-flow-row">
                                    <Form.Item label="Weight" name="weight" rules={[{ required: true, message: "Weight must be valid", type: "number", min: 0 }]}>
                                        <InputNumber className="!w-full" title="Weight" name="weight" size="large" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-row">
                                    <Form.Item label="Height" name="height"  rules={[{ required: true, message: "Height must be valid", type: "number", min: 0 }]}>
                                        <InputNumber className="!w-full" title="Height" name="height" size="large" />
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

export default NewUser;