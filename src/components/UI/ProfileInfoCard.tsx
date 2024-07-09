import Account from "@/api/entities/account.entity";
import { Image } from "antd";

interface Props {
    account: Account | null
}


const ProfileInfoCard: React.FC<Props> = ({ account }) => {

    const roles = account?.roles.map((role) => role.role).join(",");

    return (
        <div className="m-8 gap-6 flex items-center justify-center">
            <div
                className=" dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                <div className="flex items-center gap-4">
                    <Image
                        src={`data:image/png;base64, ${account?.photo}`}
                        alt={account?.firstName}
                        preview={false}
                        className="!w-32 group-hover:w-36 group-hover:h-36 !h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                    />
                    <div className="w-fit transition-all transform duration-500 mt-4">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                            Welcome {account?.firstName} {account?.lastName}
                        </h1>
                        <p className="text-gray-400">{roles}</p>
                        <a
                            className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                            {account?.email}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfoCard;