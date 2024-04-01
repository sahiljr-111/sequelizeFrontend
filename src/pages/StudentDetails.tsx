import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchStudentDetails } from '../apis/api'
import { useParams } from 'react-router-dom'

const StudentDetails = () => {
  const params = useParams<{ id?: string }>()
  const studId = params.id ? parseInt(params.id) : undefined;
  const [details, setDetails] = useState<any>()
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ['studDetails', { id: studId }],
    queryFn: () => fetchStudentDetails(studId)
  })

  interface OrderDetails {
    Book: {
      id: String,
      author: String,
      book_name: String,
      book_category: String,
      book_price: String,
    }
    issueDate: String,
    submitDate: String,
    status: String
  }

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else {
      if (data && data.data && data.data.length > 0) {
        setDetails(data.data[0]);
        console.log("d", details);
      }
    }
  }, [isLoading, data, details]);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{isError}</div>
  }

  return (
    <div>
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
        <h2 className="text-2xl font-bold">Student Details</h2>
        <div className="mt-3 h-[380px] flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
          <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
            <div className="px-8 py-5 text-left">
              <div className="text-sm text-left font-medium text-gray-700">#{details?.id}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                <div className="mb-4">
                  <div className="mt-1.5 text-sm font-semibold"><span className=' text-gray-700'>Name </span> : {details?.name.toUpperCase()}</div>
                  <div className="mt-1.5 text-sm font-medium "><span className=' text-gray-700'>Email </span> : {details?.email}</div>
                  <hr />
                </div>
                <div className="mb-4">
                  <div className="mt-1.5 text-sm font-semibold"><span className=' text-gray-700'>Password </span> : {
                    details?.password?.slice(0, -3).replace(/./g, '*') + details?.password?.substr(-3)
                  }</div>
                  <div className="mt-1.5 text-sm font-medium "><span className=' text-gray-700'>Contact </span> : {details?.contact}</div>
                  <hr />
                </div>
                <div className="mb-4">
                  <div className="mt-1.5 text-sm font-semibold"><span className=' text-gray-700'>Course </span> : {details?.course}</div>
                  <div className="mt-1.5 text-sm font-medium "><span className=' text-gray-700'>Semester </span> : {details?.semester}</div>
                  <div className="mt-1.5 text-sm font-medium "><span className=' text-gray-700'>Subject </span> : {details?.subject}</div>
                  <hr />
                </div>
                <div className="mb-4">
                  <div className="mt-1.5 text-sm font-semibold"><span className=' text-gray-700'>Country </span> : {details?.country}</div>
                  <div className="mt-1.5 text:sm font-medium "><span className=' text-gray-700'>State </span> : {details?.state}</div>
                  <div className="mt-1.5 text-sm font-medium "><span className=' text-gray-700'>City </span> : {details?.city}</div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-auto overflow-y-auto">
            <h2 className='font-bold text-left px-8 py-3'>Purchased Books Details</h2>
            <div className="px-6 py-6 text-left">
              <ul className=" flex flex-col gap-4">
                {
                  details && details.Orders?.map((item: OrderDetails) => {
                    return (
                      <>
                        <li className="flex border shadow-sm rounded-md p-4 flex-col justify-between space-x-5 py-7 md:flex-row">
                          <div className="flex flex-1 items-stretch">

                            <div className="ml-5 flex flex-col justify-between">
                              <div className="flex-1">
                                <p className="mt-1.5 text-sm font-medium text-gray-800">Book name : {item?.Book?.book_name}</p>
                                <p className="mt-1.5 text-sm font-medium text-gray-800">Book name : {item?.Book?.author}</p>
                                <p className="mt-1.5 text-sm font-medium text-gray-800">Book category : {item?.Book?.book_category}</p>
                                <p className="mt-1.5 text-sm font-medium text-gray-800">Issue date : {item?.issueDate}</p>
                                <p className="mt-1.5 text-sm font-medium text-gray-800">Submit date : {item?.submitDate}</p>
                              </div>
                            </div>
                          </div>

                          <div className="ml-auto flex flex-col items-end justify-between">
                            <p className="text-right text-sm font-bold text-gray-900">₹{item?.Book?.book_price}/-</p>
                            <p className={`flex justify-center items-center 
                                ${item?.status === 'pending' ?
                                'bg-yellow-300/40' :
                                item.status === 'completed' &&
                                'bg-green-300/40'
                              } px-3 py-1 rounded-full text-right text-sm font-bold text-gray-900`}
                            >
                              {item?.status}
                            </p>
                          </div>
                        </li>
                      </>
                    )
                  })
                }
              </ul>
              {/* <hr className="my-8 border-t border-t-gray-200" /> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails