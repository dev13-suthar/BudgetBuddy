"use client"
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

type LoginForm = {
  email: string;
  password: string;
};

const initialvalues: LoginForm = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const loginFormAPi  = async(values:LoginForm,Formikhelper:FormikHelpers<LoginForm>)=>{
      const res = await fetch("/api/auth/login",{
        method:"POST",
       headers:{
        "Content-Type":"application/json",
       },
       body:JSON.stringify({email:values.email,password:values.password})
      });
      await res.json();
      if(!res.ok){
        console.log("failed to fetch")
      }else{
          console.log("Logged IN BRO")
      }
  };

  const handleFormSubmit = async(values:LoginForm,Formikhelper:FormikHelpers<LoginForm>)=>{
        await loginFormAPi(values,Formikhelper);
        Formikhelper.resetForm();
        router.push("/home")
  }
  return (
    <>
      <Formik onSubmit={handleFormSubmit} initialValues={initialvalues}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form action="" className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Email"
              className="p-2 border-2 rounded-md outline-none focus:ring-2 ring-sky-300 ring-offset-2"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Password"
              className="p-2 border-2 rounded-md outline-none focus:ring-2 ring-sky-300 ring-offset-2"
            />
            {errors.password && touched.password && errors.password}
            <button className="p-2 border-2 rounded-lg bg-sky-200" type="submit">
                Login
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
