import { getAccountWithToken } from "@/api/services/account.service";
import SignInButton from "@/components/UI/sign-in-button";
import { Card } from "antd";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession();
    if (session) {
        const account = await getAccountWithToken();
        if (account)
            redirect("/")
    }
    return (
        <div className="flex h-screen bg-light">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-light text-black">
                <Image src={"/assets/banner/login-banner.png"} alt="login-banner-image" width={900} height={650} className="mx-auto" />
            </div>
            <div className="w-full bg-light lg:w-1/2 flex items-center justify-center">
                <div className="items-center">
                    <Card>
                        <div className="space-y-8">
                            <h1 className="text-center font-extrabold text-2xl text-primary-header-color">
                                MedSoft allows you to manage your hospital appointments and communicate easily with doctors.
                            </h1>
                            <div className="text-center font-bold text-2xl text-primary-header-color">
                                <h1>Login and Use MedSoft System Now!</h1>
                            </div>
                            <div className="relative text-center btn-group space-y-4 lg:space-x-11">
                                <SignInButton className="!text-xl w-[180px] !h-[40px]" />
                                <Link href={"/sign-up"} className="!text-xl w-[180px] !h-[40px]">Sign Up</Link>
                            </div>
                            <div className="text-center !text-primary-link-color underline">
                                <Link href="">Forgot Password?</Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page;