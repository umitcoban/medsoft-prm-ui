"use client"

import axiosInstance from "@/api/axiostInstance";
import Account from "@/api/entities/account.entity";
import { updateAccountWithId } from "@/api/services/account.service";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, DatePicker, Divider, Form, Image, Input, InputNumber, Modal, Upload, UploadFile } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

interface Props {
    account: Account | null;
}

const UpdateUser: React.FC<Props> = ({ account }) => {
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [fileList, setFileList] = useState<UploadFile[]>(
        account?.photo ? [
            {
                name: account.firstName,
                uid: account.id,
                fileName: account.firstName,
                url: "data:image/png;base64," + account.photo
            }] : []);

    const onSubmitForm = async () => {
        if(!account?.id){
            notification.error({ message: "Account settings update error!", closable: true, placement: "top" });
            return;
        }
        const data: Partial<Account> = {
            birthDate: form.getFieldValue("birthDate"),
            email: form.getFieldValue("email"),
            firstName: form.getFieldValue("firstName"),
            lastName: form.getFieldValue("lastName"),
            height: form.getFieldValue("height"),
            weight: form.getFieldValue("weight"),
            phone: form.getFieldValue("phone")
        };
        const response = await updateAccountWithId(data, account?.id);
        if (response) {
            notification.success({ message: "Account settings successfully updated!", closable: true, placement: "top" });
            account = response;
        } else {
            notification.error({ message: "Account settings update error!", closable: true, placement: "top" });
        }
    }

    const handleFileRemove = async (file: UploadFile) => {

        const response = await axiosInstance.delete(`/documents/api/photos/profile/${file.uid}`);

        if (response.data.data === true) {
            setFileList([]);
            setPreviewImage('');
            notification.success({ message: "Photo deleting successfully!", closable: true, placement: "top" });
        } else {
            notification.error({ message: "Photo deleting error!", closable: true, placement: "top" });
        }
    };

    const handleFileUpload = async (file: any) => {
        try {
            if (!account) {
                notification.error({ message: "Photo upload error!", closable: true, placement: "top" });
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", account?.id ? account.id : "");
            const response = await axiosInstance.post("/documents/api/photos/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            notification.success({ message: "Photo uploaded successfully!", closable: true, placement: "top" });

            setFileList([
                {
                    uid: account.id,
                    name: account.firstName,
                    status: 'done',
                    url: "data:image/png;base64," + response.data.data,
                },
            ]);
        } catch (error) {
            notification.error({ message: "Photo upload error!", closable: true, placement: "top" });
            console.error("Error uploading photo:", error);
            return false;
        }
    };

    const handlePreview = async (file: UploadFile) => {
        setPreviewImage(file.url || (file.thumbUrl as string));
        setPreviewVisible(true);
    };

    const handleCancel = () => setPreviewVisible(false);

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
                                    <Upload
                                        listType="picture-circle"
                                        multiple={false}
                                        maxCount={1}
                                        accept=".png,.jpeg,.jpg"
                                        onPreview={handlePreview}
                                        fileList={fileList}
                                        onRemove={handleFileRemove}
                                        customRequest={({ file }) => handleFileUpload(file)}>

                                        {fileList.length >= 1 ? null : (
                                            <button style={{ border: 0, background: 'none' }} type="button">
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </button>
                                        )}
                                    </Upload>
                                    <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
                                        <Image alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
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

export default UpdateUser;