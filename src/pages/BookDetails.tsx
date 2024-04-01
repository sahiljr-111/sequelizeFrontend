import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../apis/api";
import { useQuery } from "@tanstack/react-query";

const BookDetails = () => {
  const params = useParams<{ id?: string }>();
  const studId = params.id ? parseInt(params.id) : undefined;
  const [details, setDetails] = useState<any>();
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["studDetails", { id: studId }],
    queryFn: () => fetchBookDetails(studId),
  });

  interface OrderDetails {
    id: number;
    studentId: number;
    bookId: number;
    status: string;
    issueDate: string;
    submitDate: string;
    createdAt: string;
    updatedAt: string;
    Student: Student;
  }
  interface Student {
    id: number;
    name: string;
    email: string;
    password: string;
    contact: number;
    course: string;
    semester: string;
    subject: string;
    country: string;
    state: string;
    city: string;
    createdAt: string;
    updatedAt: string;
  }

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else {
      if (data && data.data && data.data.length > 0) {
        setDetails(data.data[0]);
      }
    }
  }, [isLoading, data, details]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div>
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
        <h2 className="text-2xl font-bold">Book Details</h2>
        <div className="mt-3 h-[380px] flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
          <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
            <div className="px-8 py-5 text-left">
              <div className="text-sm text-left font-medium text-gray-700">
                #{details?.id}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                <div className="mb-4">
                  <div className="mt-1.5 text-sm font-semibold">
                    <span className=" text-gray-700">Name </span> :{" "}
                    {details?.book_name?.toUpperCase()}
                  </div>
                  <div className="mt-2 text-sm font-medium ">
                    <span className=" text-gray-700">Category </span> :{" "}
                    {details?.book_category}
                  </div>
                  <div className="mt-2 text-sm font-medium ">
                    <span className=" text-gray-700">Price </span> : ₹
                    {details?.book_price}
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    <span className=" text-gray-700">Author </span> :{" "}
                    {details?.author}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="flex-1 h-auto overflow-y-auto">
            <h2 className="font-bold text-left px-8 py-3">
              Purchased Student Details
            </h2>
            <div className="px-6 py-6 text-left">
              <ul className=" flex flex-col gap-4">
                {details &&
                  details.Orders?.map((item: OrderDetails) => {
                    return (
                      <>
                        <div className="border rounded-md px-5 py-4">
                          <li>
                            <div className="flex justify-between">
                              <div>
                                <div className="flex flex-col justify-between">
                                  <h1 className="text-gray-500 text-xs">
                                    Student Details
                                  </h1>
                                  <div>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      ID : {item?.Student.id}
                                    </p>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      Name : {item?.Student.name}
                                    </p>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      Contact : {item?.Student.contact}
                                    </p>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      City : {item?.Student.city}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h1 className="p-3"></h1>
                                <div>
                                  <p className="mt-1.5 text-sm font-medium text-gray-800">
                                    Course : {item?.Student.course}
                                  </p>
                                  <p className="mt-1.5 text-sm font-medium text-gray-800">
                                    Semester : {item?.Student.semester}
                                  </p>
                                  <p className="mt-1.5 text-sm font-medium text-gray-800">
                                    Subject : {item?.Student.subject}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="flex flex-col justify-between">
                                  <h1 className="text-gray-500 text-xs text-center">
                                    Order Details
                                  </h1>
                                  <div className="text-center m-3">
                                    <p
                                      className={`flex justify-center items-center 
                                ${
                                  item?.status === "pending"
                                    ? "bg-yellow-300/40"
                                    : item.status === "completed" &&
                                      "bg-green-300/40"
                                } px-3 py-1 rounded-full text-right text-sm font-bold text-gray-900`}
                                    >
                                      {item?.status}
                                    </p>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      Issue date : {item?.issueDate}
                                    </p>
                                    <p className="mt-1.5 text-sm font-medium text-gray-800">
                                      Submit date : {item?.submitDate}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </div>
                      </>
                    );
                  })}
              </ul>
              {/* <hr className="my-8 border-t border-t-gray-200" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
