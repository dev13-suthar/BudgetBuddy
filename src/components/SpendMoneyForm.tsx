"use client";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SpendMoney = {
  description: string;
  category: string;
  toWhom: string;
};

const initialValues: SpendMoney = {
  description: "",
  category: "",
  toWhom: "",
};

const SpendMoneyForm = () => {
  const [amount, setamount] = useState<null | number | any>(null);
  const router = useRouter();

  const getData = async(value:SpendMoney,formikHelpers:FormikHelpers<SpendMoney>)=>{
      try {
        const res = await fetch("/api/transactions/spendMoney",{
          method:"POST",
          headers:{
            "Content-Type":"applications/json"
          },
          body:JSON.stringify({amount:amount,description:value.description,type:"debit",merchant:value.toWhom,category:value.category})
        });
        if(!res.ok){
          throw new Error("SomeThing Went Wrong")
        }
        const data = await res.json();
        console.log(data)
      } catch (error) {
          console.log(error)
      }
  };

  const handleFormSubmit = async(value:SpendMoney,formikHelpers:FormikHelpers<SpendMoney>)=>{
      await getData(value,formikHelpers);
      formikHelpers.resetForm();
      router.push("/home")
  }
  return (
    <>
      <div className="mt-[4rem] p-1">
        <p className="text-xl text-gray-500 font-medium">How much?</p>
        <input
          type="text"
          placeholder="0"
          name="rupees"
          onChange={(e)=>setamount(Number(e.target.value))}
          className="mt-4 w-full p-4 border-2 rounded-md bg-red-100 text-[1.33rem]"
        />
      </div>
      {/* Other Info */}
      <div className="h-screen w-full bg-sky-100 rounded-tr-2xl rounded-tl-2xl py-6 p-4 mt-[2rem]">
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 justify-center"
            >
              <TextField
                label="Description"
                placeholder="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description && errors.description}

              <TextField
                label="Category"
                placeholder="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.category && touched.category && errors.category}

              <TextField
                label="TO Whom"
                placeholder="description"
                name="toWhom"
                value={values.toWhom}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.toWhom && touched.toWhom && errors.toWhom}
              {/* <TextField label="Desc" placeholder="description" /> */}
              <button type="submit" className="w-full p-3 border-2 mt-[3rem] bg-red-300 focus:outline-none ring-2 ring-red-500 ring-offset-1 rounded-lg">
                Continue
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SpendMoneyForm;
