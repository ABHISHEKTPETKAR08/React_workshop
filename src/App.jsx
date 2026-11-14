import { useState } from 'react'
import Dialog from './components/Dialog.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [students, setStudents] = useState([])

  function handleAddStudent(student) {
    setStudents((currentStudents) => [
      ...currentStudents,
      { ...student, id: crypto.randomUUID() },
    ])
    setDialogOpen(false)
  }

  return (
    <div className="portal-app">
      <Header />
      <main className="portal-content">
        <button
          type="button"
          className="add-student-button"
          onClick={() => setDialogOpen(true)}
        >
          Add new Student
        </button>

        <section className="student-dashboard" aria-labelledby="student-list-heading">
          <div className="student-dashboard-heading">
            <h2 id="student-list-heading">Students</h2>
            <span>{students.length} {students.length === 1 ? 'student' : 'students'}</span>
          </div>

          {students.length === 0 ? (
            <p className="student-empty-state">No students have been added yet.</p>
          ) : (
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentName}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      {dialogOpen && (
        <Dialog
          onClose={() => setDialogOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}
    </div>
  )
}

export default App
