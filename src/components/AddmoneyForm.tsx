"use client";
import { TextField } from "@mui/material";
import { error } from "console";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

type addmoneyForm = {
  amount: number;
  description: string;
  category: string;
  sender: string;
};

const inittialValues: addmoneyForm = {
  amount: 0,
  description: "",
  category: "",
  sender: "",
};

const AddmoneyForm = () => {
  const [error, seterror] = useState("");
  const router = useRouter();
    const fetchData = async(values:addmoneyForm,formikHelper:FormikHelpers<addmoneyForm>)=>{
        try {
          seterror("")
            const res = await fetch("/api/transactions/addMoney",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({type:"credit",amount:Number(values.amount),description:values.description,merchant:values.sender})
            })
            if(!res.ok){
              throw new Error("something went wrong")
            };
            await res.json();
            router.push("/home")
        } catch (error:any) {
            seterror(error.message)
            console.log(error);
        }
        
    }

    const handleFormSubmit = async(values:addmoneyForm,formikHelper:FormikHelpers<addmoneyForm>)=>{
        await fetchData(values,formikHelper);
        formikHelper.resetForm();
    }
  return (
    <>
      <div className=" p-3 mt-[6rem] flex flex-col justify-start mb-6 bg-slate-100 rounded-tl-2xl rounded-tr-2xl max-h-full overflow-scroll">
        <Formik onSubmit={handleFormSubmit} initialValues={inittialValues}>
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
              className="flex flex-col gap-4 h-[100%] pt-[4rem]"
            >
              <p className=" text-xl mb-2 text-black">How Much?</p>
              <input
                placeholder="0"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                name="amount"
                className="text-[2.4rem] font-medium text-white"
                style={{
                  background: "lightgreen",
                  padding: "4px",
                  borderRadius: "8px",
                }}
              />
              <TextField
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Description"
                name="description"
              />
              {errors.description && touched.description && errors.description}

              <TextField
                label="Category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Category"
                name="category"
              />
              {errors.category && touched.category && errors.category}
              <TextField
                label="Sender"
                value={values.sender}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Sender"
                name="sender"
              />
               {error && <p className="text-red-400 text-xl font-semibold">{error}</p>}
              <button className="p-2 border-2 mt-[1rem] bg-purple-200 rounded-lg">
                Continue
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddmoneyForm;
