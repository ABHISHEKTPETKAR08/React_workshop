import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Dialog from './components/Dialog.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [students, setStudents] = useState([])

  function handleSaveStudent(studentDetails) {
    if (editingStudent) {
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...studentDetails }
            : student,
        ),
      )
    } else {
      setStudents((currentStudents) => [
        ...currentStudents,
        { ...studentDetails, id: crypto.randomUUID() },
      ])
    }

    setDialogOpen(false)
    setEditingStudent(null)
  }

  function handleOpenAddDialog() {
    setEditingStudent(null)
    setDialogOpen(true)
  }

  function handleOpenEditDialog(student) {
    setEditingStudent(student)
    setDialogOpen(true)
  }

  function handleDeleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    )
  }

  return (
    <div className="portal-app">
      <Header />
      <main className="portal-content">
        <button
          type="button"
          className="add-student-button"
          onClick={handleOpenAddDialog}
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
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentName}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>
                        <div className="student-actions-cell">
                          <button
                            type="button"
                            className="edit-student-button"
                            aria-label={`Edit ${student.studentName}`}
                            title={`Edit ${student.studentName}`}
                            onClick={() => handleOpenEditDialog(student)}
                          >
                            <Pencil size={17} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="delete-student-button"
                            aria-label={`Delete ${student.studentName}`}
                            title={`Delete ${student.studentName}`}
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 size={17} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
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
          key={editingStudent?.id ?? 'new-student'}
          student={editingStudent}
          onClose={() => {
            setDialogOpen(false)
            setEditingStudent(null)
          }}
          onSubmit={handleSaveStudent}
        />
      )}
    </div>
  )
}

export default App
