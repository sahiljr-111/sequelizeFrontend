import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="relative w-full bg-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span className="font-bold text-2xl">Library</span>
          </div>
          <div className="hidden grow items-start lg:flex justify-center">
            <ul className="ml-12 inline-flex space-x-8">
              <Link to={'/'} className='text-lg align-middle font-semibold text-gray-800 hover:underline underlined-offset-1 '> Home </Link>
            </ul>
          </div>
          <div className="hidden lg:block">
            <button type='button' className='text-sm py-1 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 font-semibold leading-7 text-white hover:bg-black/80 ' onClick={() => navigate('/add-students')} >Add new Student</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header