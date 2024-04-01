import React, { useEffect, useState } from "react";
import InputField from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import country from "../components/countries";
import { useNavigate } from "react-router-dom";

interface formData {
  name: String;
  email: String;
  password: String;
  contact: Number;
  course: String;
  sem: String;
  subject: String;
  country: String;
  state: String;
  city: String;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required("name is required field")
      .min(3, "Name have minimum 3 character length")
      .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
    email: yup.string().email("Invalid email").required(),
    password: yup
      .string()
      .required("password is required field")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        "Password must contain at least one uppercase letter and one special character"
      ),
    contact: yup
      .number()
      .required()
      .test(
        "len",
        "Contact must be exactly 10 characters",
        (val: any) => val && val.toString().length === 10
      ),
    course: yup.string().required(),
    sem: yup.string().required(),
    subject: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
  })
  .required();

const AddStud = () => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;
  // const { register, reset, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
  //   resolver: yupResolver(schema),
  // });
  // console.log(errors, "-", isSubmitSuccessful);
  const [selectCourse, setSelectCourse] = useState<string | any>();
  const [selectSem, setSelectSem] = useState<string | any>();
  const [selectCountry, setSelectCountry] = useState<string | any>();
  const [selectState, setSelectState] = useState<string | any>();
  // console.log(country);

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset]);

  interface SubjectItem {
    value: string;
    label: string;
  }

  interface SubjectSemester {
    [key: number]: SubjectItem[];
  }

  interface Subject {
    [key: string]: {
      [key: number]: SubjectItem[];
    };
  }

  const subject: Subject = {
    BCA: {
      1: [
        { value: "C", label: "C" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
      ],
      2: [
        { value: "C++", label: "C++" },
        { value: "Javascript", label: "Javascript" },
        { value: "Python", label: "Python" },
      ],
      3: [
        { value: "Java", label: "Java" },
        { value: ".NET", label: ".NET" },
        { value: "WEB", label: "WEB" },
      ],
    },
    BCOM: {
      1: [
        { value: "Accounting", label: "Accounting" },
        { value: "Economics", label: "Economics" },
        { value: "Mathematics", label: "Mathematics" },
      ],
      2: [
        { value: "Law", label: "Law" },
        { value: "Management", label: "Management" },
        { value: "Marketing", label: "Marketing" },
      ],
      3: [
        { value: "TaxLaws", label: "TaxLaws" },
        { value: "HumanResource", label: "HumanResource" },
        { value: "Auditing", label: "Auditing" },
      ],
    },
  };
  // console.log(subject);
  const onSubmitForm = (data: formData) => {
    axios
      .post("http://localhost:8080/add-student", {
        name: data.name,
        email: data.email,
        password: data.password,
        contact: data.contact,
        course: data.course,
        semester: data.sem,
        subject: data.subject,
        country: data.country,
        state: data.state,
        city: data.city,
      })
      .then((response) => {
        console.log(response);
        console.log("successfully Added !");
        navigate("/");
      })
      .catch((error) => {
        console.log("FETCHING ERROR:", error);
      });
    console.log(data);
  };
  return (
    <div className="w-full mx-auto my-5">
      <h2 className="font-bold text-xl">Add new students</h2>
      <div className="text-left my-10">
        <FormProvider {...methods}>
          <div className="w-3/4 mx-auto grid grid-cols-3 gap-x-5">
            <div className="py-2">
              <InputField label="Name" type="text" placeholder="Enter Name" />
            </div>
            <div className="py-2">
              <InputField
                label="Email"
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="py-2">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="py-2">
              <InputField
                label="Contact"
                type="text"
                placeholder="Enter Contact"
              />
            </div>
            <div className="py-2">
              <InputField
                label="Select Course"
                type="select"
                options={Object.keys(subject).map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e: any) => {
                  setSelectCourse(e.target.value);
                }}
                className="border border-gray-300 px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-2">
              {selectCourse && (
                <InputField
                  label="Select Semester"
                  type="select"
                  options={Object.keys(subject[selectCourse]).map((item) => ({
                    value: item,
                    label: `Semester ${item}`,
                  }))}
                  onChange={(e: any) => setSelectSem(e.target.value)}
                  className="border border-gray-300 px-2 py-2 rounded-md w-full"
                />
              )}
            </div>
            <div className="py-2">
              {selectSem && (
                <InputField
                  label="Select Subject"
                  type="select"
                  options={subject[selectCourse][selectSem]}
                  className="border border-gray-300 px-2 py-2 rounded-md w-full"
                />
              )}
            </div>

            {/* COUNTRY */}
            <div className="py-2">
              <InputField
                label="Select Country"
                type="select"
                options={Object.keys(country).map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e: any) => setSelectCountry(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-2">
              {selectCountry && (
                <InputField
                  label="Select State"
                  type="select"
                  options={Object.keys(country[selectCountry]).map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onChange={(e: any) => setSelectState(e.target.value)}
                  className="border border-gray-300 px-2 py-2 rounded-md w-full"
                />
              )}
            </div>
            <div className="py-2">
              {selectState && (
                <InputField
                  label="Select City"
                  type="select"
                  options={country[selectCountry][selectState]}
                  className="border border-gray-300 px-2 py-2 rounded-md w-full"
                />
              )}
            </div>
          </div>

          <div className="w-[250px] mx-auto text-center">
            <button
              type="submit"
              className="w-auto bg-black text-white p-2 rounded-md"
            >
              Add new student!
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddStud;
