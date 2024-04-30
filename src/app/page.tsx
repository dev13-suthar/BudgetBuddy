import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
        <div className="mt-[4rem] flex justify-center lg:justify-normal">
            <div className="flex flex-col gap-5 p-4">
                <header>
                  <p className="text-[2.2rem] font-semibold">Login To Your Account</p>
                  <Link href={"/register"} className="text-xs font-bold underline">New Here?Sign in</Link>
                </header>
                <LoginForm/>
            </div>
        </div>  
    </main>
  );
}
