import React, { useEffect, useState } from "react";
import InputField from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import country from "../components/countries";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentDetails } from "../apis/api";

interface FormData {
  name: string;
  email: string;
  password: string;
  contact: string;
  course: string;
  sem: string;
  subject: string;
  country: string;
  state: string;
  city: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Name is a required field")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      "Password must contain at least one uppercase letter and one special character"
    ),
  contact: yup
    .string()
    .required()
    .test(
      "len",
      "Contact must be exactly 10 characters",
      (val: any) => val && val.length === 10
    ),
  course: yup.string().required(),
  sem: yup.string().required(),
  subject: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
});

const EditStud = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams<{ id?: string }>();
  // const [selectCourse, setSelectCourse] = useState<string | any>();
  // const [selectSem, setSelectSem] = useState<string | any>();
  // const [selectCountry, setSelectCountry] = useState<string | any>();
  // const [selectState, setSelectState] = useState<string | any>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    contact: "",
    course: "",
    sem: "",
    subject: "",
    country: "",
    state: "",
    city: "",
  });
  const studId = params.id ? parseInt(params.id) : undefined;
  const [details, setDetails] = useState<any>();
  const { data, isLoading } = useQuery({
    queryKey: ["studDetails", { id: studId }],
    queryFn: () => fetchStudentDetails(studId),
  });

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else {
      if (data && data.data && data.data.length > 0) {
        setDetails(data.data[0]);
        setFormData({
          ...formData,
          name: details?.name,
          email: details?.email,
        });
      }
    }
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset, isLoading, data]);

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="w-full mx-auto my-5">
      <h2 className="font-bold text-xl">Update Student</h2>
      <div className="text-left my-10">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="w-3/4 mx-auto grid grid-cols-3 gap-x-5">
            <div className="py-2">
              <InputField
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter Name"
              />
              {errors.name && (
                <p role="alert" className="text-red-900 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="py-2">
              <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter Email"
              />
              {errors.email && (
                <p role="alert" className="text-red-900 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="py-2">
              <InputField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p role="alert" className="text-red-900 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="py-2">
              <InputField
                label="Contact"
                type="text"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="Enter Contact"
              />
              {errors.contact && (
                <p role="alert" className="text-red-900 text-sm">
                  {errors.contact.message}
                </p>
              )}
            </div>
            {/* Rest of the input fields */}
          </div>
          <div className="w-[250px] mx-auto text-center">
            <button
              type="submit"
              className="w-auto bg-black text-white p-2 rounded-md"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStud;
