"use client"

import Account from "@/api/entities/account.entity";
import { updateAccountPassword } from "@/api/services/account.service";
import { App, Button, Divider, Form, Input, Result } from "antd";
import { FaSave } from "react-icons/fa";

interface Props {
    account: Account | null;
}



const UserSettings: React.FC<Props> = ({ account }) => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();

    if(!account)
        return <Result status="error" title="Oops.. Something Went Wrong!"  />

    const onSubmitForm = async () => {
        const password = form.getFieldValue("password");
        const password2 = form.getFieldValue("password2");
        if(password !== password2){
            notification.error({ message: "Passwords do not match!", closable: true, placement: "top"});
            return;
        }
        const response = await updateAccountPassword(account?.id, password);
        if (response) {
            notification.success({ message: "Account settings successfully updated!", closable: true, placement: "top" });
        } else {
            notification.error({ message: "Account settings update error!", closable: true, placement: "top" });
        }
    }


    return (
        <section className="!space-y-12">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid-flow-row">
                    <h1 className="text-primary-header-color text-3xl font-extrabold">Personal Settings</h1>
                    <h4 className="text-primary-text-color text-xl mt-4">Update your settings here</h4>
                </div>
            </div>
            <Divider className="!text-primary-text-color" orientation="center" dashed />
            <Form form={form} layout="vertical" onFinish={onSubmitForm}>
                <section id="communication-property">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid-flow-col">
                            <h2 className="text-primary-header-color text-2xl font-extrabold">Security: </h2>
                        </div>
                        <div className="grid-flow-col">
                            <div className="grid grid-cols-1 gap-2 text-center">
                                <div className="grid-flow-row w-1/2 mx-auto">
                                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password must be valid", type: "string", min: 3 }]}>
                                        <Input.Password title="Password" inputMode="text" />
                                    </Form.Item>
                                </div>
                                <div className="grid-flow-row w-1/2 mx-auto">
                                    <Form.Item label="Password Again" name="password2" rules={[{ required: true, message: "Password must be valid", type: "string", min: 3 }]}>
                                        <Input.Password title="Password Again" inputMode="text" />
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

export default UserSettings;