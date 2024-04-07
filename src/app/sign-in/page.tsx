import SignInButton from "@/components/UI/sign-in-button";
import { Card } from "antd";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = () => {
    const session = getServerSession();
    if (!session)
        redirect("/")
    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-50 text-black">
                <Image src={"/assets/banner/login-banner.png"} alt="login-banner-image" width={750} height={650} className="mx-auto" />
            </div>
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="items-center gap-y-8">
                    <Card>
                        <div className="text-center font-bold">
                            <h1>Login and Use MedSoft System Now!</h1>
                        </div>
                        <div className="relative text-center mt-4">
                            <SignInButton />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page;