"use server"
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('@/components/sign-up/SignUp'), { ssr: false })

const Page = async () => {
    return (
        <main className="w-screen h-screen bg-gradient-to-r from-slate-500 to-slate-800 grid justify-center items-center">
            <NoSSR />
        </main>
    )
}

export default Page;