import SignOut from "@/components/UI/sign-out-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session)
    redirect("/sign-in")

  return (
    <main className="min-h-screen w-full">
      <p className="w-1/2">{session ? session.accessToken : "not login"}</p>
      <SignOut />
    </main>
  );
}
