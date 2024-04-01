import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation, useQuery, UseMutationOptions } from '@tanstack/react-query'
import { deleteStudent, viewBooks, viewStudents } from '../apis/api'

interface StudData {
  id: Number,
  name: String,
  email: String,
  contact: String,
  course: String
}

interface bookData {
  id: number;
  book_name: string;
  book_category: string;
  book_price: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}
const Home = () => {
  const navigate = useNavigate()
  const [searchType, setSearchType] = useState<string>('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<any>();
  const { data: fetchedData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: viewStudents
  });

  const { data: fetchedBooks, isLoading: isLoadingBooks } = useQuery({
    queryKey: ['books'],
    queryFn: viewBooks
  });

  const deleteMutationOptions: UseMutationOptions<void, Error, number> = {
    mutationFn: (id: number) => deleteStudent(id),
  };

  const deleteMutation = useMutation<void, Error, number>(deleteMutationOptions);

  const handleDelete = (e: any, id: number) => {
    e.stopPropagation();
    deleteMutation.mutate(id);
    window.location.reload()
  };

  useEffect(() => {
    if (searchType === 'student' && !isLoadingStudents && fetchedData) {
      setData(fetchedData.data);
    }
    if (searchType === 'book' && !isLoadingBooks && fetchedBooks) {
      setData(fetchedBooks.data);
    }
  }, [searchType, fetchedData, fetchedBooks, isLoadingStudents, isLoadingBooks]);
  if (isLoadingStudents || isLoadingBooks) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Toaster />
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="border relative w-full p-2 rounded-md">
          <select name="" value={searchType} onChange={(e) => setSearchType(e.target.value)} className='absolute border-1 border-black' id="">
            <option value="student" selected>Student</option>
            <option value="book">Book</option>
          </select>
          <input
            type="text"
            className='w-full px-24 focus:outline-none'
            placeholder={`Search ${searchType}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                {
                  searchType && searchType == 'student' &&
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Name</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Email</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Contact</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Course</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                        >
                          <span>Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data && data
                        .filter((item: StudData) =>
                          Object.values(item).some(val =>
                            (typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (typeof val === 'number' && val.toString().includes(searchQuery))
                          )
                        ).map((item: StudData) => (
                          <tr className='hover:bg-gray-200 hover:cursor-pointer' onClick={() => navigate(`student/${item.id}`)}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.email}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.contact}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.course}</div>
                            </td>
                            <td className="self-center p-4 flex justify-center gap-2">
                              <button
                                type='button'
                                className='bg-blue-900 py-1 px-3 hover:bg-blue-950 text-white rounded-md'
                                onClick={(e) => { e.stopPropagation(); navigate(`/student-edit/${item.id}`) }}
                              >
                                Edit
                              </button>
                              <button
                                type='button'
                                className='bg-red-900 px-3 py-1 hover:bg-red-950 text-white rounded-md'
                                onClick={(e) => handleDelete(e, Number(item.id))}
                              > Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                }
                {
                  searchType && searchType == 'book' &&
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Name</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Category</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Price</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Author</span>
                        </th>
                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data && data
                        .filter((item: bookData) =>
                          Object.values(item).some(val =>
                            (typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (typeof val === 'number' && val.toString().includes(searchQuery))
                          )
                        ).map((item: bookData) => (
                          <tr className='hover:bg-gray-200 hover:cursor-pointer' onClick={() => navigate(`book/${item.id}`)}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900">{item.book_name}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.book_category}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.book_price}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-left font-medium text-gray-900 ">{item.author}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <a href="#" className="text-gray-700">
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home