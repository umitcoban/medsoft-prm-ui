"use client"

import Image from "next/image";

const SessionLoader = () => {
    return (
        <div className="min-h-screen w-screen z-50">
            <div className="min-h-screen flex m-auto !text-center !justify-center !items-center">
                <Image src={"/assets/logo/logo.png"} alt="MedSoft Logo" width={500}  height={100} className="animate-bounce !w-[250px] !h-[250px]"/>
            </div>
        </div>
    )
}

export default SessionLoader;