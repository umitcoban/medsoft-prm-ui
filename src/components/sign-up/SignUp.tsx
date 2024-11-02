"use client"

import Account from "@/api/entities/account.entity";
import { createAccount } from "@/api/services/account.service";
import { App, Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import { HttpStatusCode } from "axios";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";


interface registerFormType {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    weight: number;
    height: number;
    birthDate: Dayjs;
}


const SignUp = () => {
    const [form] = useForm<registerFormType>();
    const { message, modal, notification } = App.useApp();
    const router = useRouter();
    const registerFormOnFinish = async () => {
        const values = form.getFieldsValue();

        const { birthDate, ...restValues } = values;

        const request: Partial<Account> = {
            birthDate: new Date(birthDate.format("YYYY-MM-DD")),
            ...restValues
        };

        const response = await createAccount(request);

        if (response && response.status === HttpStatusCode.Created) {
            notification.success({message: response.data, closable: true, onClose: () => {router.push("/")}});
        } else {
            notification.error({message: "Your MedSoft Account creation error!",  closable: true });
        }

    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Register MedSoft Application
            </div>
            <Form form={form} onFinish={registerFormOnFinish} layout="vertical" className="py-4 px-6 gap-6">
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Name"
                        labelAlign="left"
                        required
                        name={"firstName"}
                        rules={[{ required: true, min: 3, message: "Name must be not empty" }]}
                        id="name" >
                        <Input className="font-light" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Surname"
                        labelAlign="left"
                        required
                        name={"lastName"}
                        rules={[{ required: true, min: 3, message: "Surname must be not empty" }]}
                        id="surName" >
                        <Input className="font-light" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Email"
                        labelAlign="left"
                        required
                        name={"email"}
                        rules={[{ required: true, type: "email", message: "Email must be valid" }]}
                        id="email" >
                        <Input className="font-light" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Phone"
                        labelAlign="left"
                        required
                        name={"phone"}
                        rules={[{ required: true, pattern: /([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g, message: "Phone must be valid" }]}
                        id="phone" >
                        <Input className="font-light" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Birth Of Date"
                        labelAlign="left"
                        required
                        name={"birthDate"}
                        rules={[{ required: true, type: "date", message: "Phone must be valid" }]}
                        id="birthOfDate" >
                        <DatePicker format={"YYYY-MM-DD"} className="font-light w-full" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Password"
                        labelAlign="left"
                        required
                        name={"password"}
                        rules={[{ required: true, min: 6, type: "string", message: "Password must be valid" }]}
                        id="password" >
                        <Input.Password />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Weight"
                        labelAlign="left"
                        required
                        name={"weight"}
                        initialValue={1}
                        rules={[{ required: true, type: "number", message: "Weight must be valid" }]}
                        id="weight" >
                        <InputNumber min={0} style={{ width: "100%" }} className="font-light w-full" />
                    </Form.Item>
                </div>
                <div className="mb-4">
                    <Form.Item
                        className="shadow font-bold appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        label="Height"
                        labelAlign="left"
                        required
                        name={"height"}
                        initialValue={1}
                        rules={[{ required: true, type: "number", message: "Height must be valid" }]}
                        id="height" >
                        <InputNumber min={0} style={{ width: "100%" }} className="font-light" />
                    </Form.Item>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <Form.Item>
                        <Button
                            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                            type="primary"
                            htmlType="submit"
                            size="large">
                            Sign Up
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    );
}

export default SignUp;