import SignInButton from "@/components/UI/sign-in-button";
import { Card } from "antd";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession();
    if (session)
        redirect("/")
    return (
        <div className="flex h-screen bg-primary-bg-color">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-100 text-black">
                <Image src={"/assets/banner/login-banner.png"} alt="login-banner-image" width={900} height={650} className="mx-auto" />
            </div>
            <div className="w-full bg-primary-bg-color lg:w-1/2 flex items-center justify-center">
                <div className="items-center gap-y-8">
                    <Card>
                        <div className="text-center font-bold text-2xl text-primary-header-color">
                            <h1>Login and Use MedSoft System Now!</h1>
                        </div>
                        <div className="relative text-center mt-12">
                            <SignInButton className="!text-xl w-[240px] !h-[40px]" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page;