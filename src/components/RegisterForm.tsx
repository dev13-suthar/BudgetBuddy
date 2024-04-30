"use client"
import { Formik, FormikHelpers } from "formik"
import { useRouter } from "next/navigation";

type RegisterForm = {
    username:string,
    password:string,
    email:string,
}

const initialValues:RegisterForm = {
    username:"",
    password:"",
    email:""
};

const RegisterForm = () => {
  const router = useRouter();
  const registerApi = async(values:RegisterForm,FormikHelpers:FormikHelpers<RegisterForm>)=>{
      try {
        const res = await fetch("http://localhost:3000/api/auth/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(values),
        });
        await res.json();
        if(!res.ok){
          throw new Error("Failed to fetvh")
        } 
      } catch (error:any) {
          console.log(error)
      }
  };

  const handleFormSubmit = async(values:RegisterForm,FormikHelpers:FormikHelpers<RegisterForm>)=>{
      await registerApi(values,FormikHelpers);
      FormikHelpers.resetForm();
      router.push("/");
  }
  return (
    <>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
        })=>(
            <form action="" className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter UserName"
            className="p-2 border-2 rounded-md outline-none focus:ring-2 ring-sky-300 ring-offset-2"
          />
          {errors.username && touched.username && errors.username}
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
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Password"
            className="p-2 border-2 rounded-md outline-none focus:ring-2 ring-sky-300 ring-offset-2"
          />
          {errors.password && touched.password && errors.password}
          <button className="p-2 border-2 rounded-lg bg-sky-200">
            Sign In
          </button>
        </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm
