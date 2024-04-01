const fetchStudentDetails = async (id: number | undefined) => {
  const response = await fetch(`http://localhost:8080/student/view-student-details/${id}`)
  const data = await response.json()
  return data
}
const fetchBookDetails = async (id: number | undefined) => {
  const response = await fetch(`http://localhost:8080/view-book-details/${id}`)
  const data = await response.json()
  return data
}

const viewStudents = async () => {
  const response = await fetch('http://localhost:8080/student/view-student')
  const data = await response.json()
  return data
}


const viewBooks = async () => {
  const response = await fetch('http://localhost:8080/view-book')
  const data = await response.json()
  return data
}

const deleteStudent = async (id: number) => {
  const response = await fetch(`http://localhost:8080/student/delete-student/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}
export { fetchStudentDetails, viewStudents, viewBooks, fetchBookDetails, deleteStudent }