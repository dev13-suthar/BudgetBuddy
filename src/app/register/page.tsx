import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <main className="p-4">
      <div className="mt-[4rem] flex justify-center lg:justify-normal">
        <div className="flex flex-col gap-4 p-4">
          <header>
            <p className="text-[2.2rem] font-semibold">Register To YourSelf</p>
            <Link href={"/"} className="text-xs font-bold underline">
              Already user?login
            </Link>
          </header>
          <RegisterForm/>
        </div>
      </div>
    </main>
  );
}

export default Register
