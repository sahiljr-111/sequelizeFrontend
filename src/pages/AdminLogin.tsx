import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit = (formData: FormData) => {
    console.log("-login-", formData);

    const { mutate } = useMutation({});

    axios
      .post("http://localhost:8080/login-admin", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === false) {
          toast(response.data.message);
        } else {
          navigate("/");
          setTimeout(() => {
            toast.success("Login success");
          }, 100);
          console.log("success login");
        }
      })
      .catch((error) => {
        console.log("LOGIN FAILED:", error);
      });
  };

  return (
    <section>
      <Toaster />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto w-1/4 ">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to Library
          </h2>
          <div>
            <FormProvider {...methods}>
              <div className="space-y-5 w-full">
                <div className="mt-2">
                  <InputField
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <div className="mt-2">
                    <InputField
                      type="password"
                      label="Password"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="w-auto bg-black text-white p-2 rounded-md"
                  >
                    Get started!
                  </button>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
