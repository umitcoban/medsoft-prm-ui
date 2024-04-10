"use client"

import Account from "@/api/entities/account.entity";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, DatePicker, Divider, Form, Input, InputNumber, Upload } from "antd";
import { FaSave } from "react-icons/fa";

import { updateAccountWithToken } from "@/api/services/account.service";
import dayjs from "dayjs";

interface Props {
    account: Account | null;
}

const MyDetails: React.FC<Props> = ({ account }) => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const onSubmitForm = async () => {
        const data: Partial<Account> = {
            birthDate: form.getFieldValue("birthDate"),
            email: form.getFieldValue("email"),
            firstName: form.getFieldValue("firstName"),
            lastName: form.getFieldValue("lastName"),
            height: form.getFieldValue("height"),
            weight: form.getFieldValue("weight"),
            phone: form.getFieldValue("phone")
        };
        const response = await updateAccountWithToken(data);
        if (response) {
            notification.success({ message: "Account settings successfully updated!", closable: true, placement: "top" });
            account = response;
        } else {
            notification.error({ message: "Account settings update error!", closable: true, placement: "top" });
        }
    }

    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Personal Detail</h1>
                    <h4 className="text-primary-text-color text-xl mt-4">Update your photo and personal details here</h4>
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
                                    <Form.Item label="First Name" name="firstName" initialValue={account?.firstName || ""} rules={[{ required: true, message: "First name must be valid", type: "string" }]} >
                                        <Input title="First Name" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-col">
                                    <Form.Item label="Last Name" name="lastName" initialValue={account?.lastName || ""} rules={[{ required: true, message: "Last name must be valid", type: "string" }]}>
                                        <Input title="Last Name" value={account?.lastName || ""} />
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
                                    <Form.Item label="Email" name="email" initialValue={account?.email || ""} rules={[{ required: true, message: "Email name must be valid", type: "email" }]}>
                                        <Input title="Email" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-row">
                                    <Form.Item label="Phone" name="phone" initialValue={account?.phone || ""} rules={[{ required: true, message: "Phone name must be valid", type: "string" }]}>
                                        <Input title="Phone" name="phone" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider className="!text-primary-text-color" orientation="center" dashed />
                <section id="image-property">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-xl font-extrabold">Photo: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid-flow-row">
                                    <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" listType="picture-circle">
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </button>
                                    </Upload>
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
                                    <Form.Item label="BirthDate" name="birthDate" initialValue={dayjs(account?.birthDate) || ""} rules={[{ required: true, message: "Birth date name must be valid", type: "date" }]}>
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
                                    <Form.Item label="Weight" name="weight" initialValue={account?.weight || ""} rules={[{ required: true, message: "Weight must be valid", type: "number", min: 0 }]}>
                                        <InputNumber className="!w-full" title="Weight" name="weight" size="large" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-row">
                                    <Form.Item label="Height" name="height" initialValue={account?.height || ""} rules={[{ required: true, message: "Height must be valid", type: "number", min: 0 }]}>
                                        <InputNumber className="!w-full"  title="Height" name="height" size="large"/>
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

export default MyDetails;