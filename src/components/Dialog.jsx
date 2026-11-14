import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const initialForm = {
  studentName: '',
  department: '',
  year: '',
}

function Dialog({ onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialForm)
  const dialogRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    dialog.showModal()
    firstInputRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const student = {
      studentName: formData.studentName.trim(),
      department: formData.department.trim(),
      year: formData.year.trim(),
    }

    if (Object.values(student).some((value) => !value)) return

    onSubmit(student)
    setFormData(initialForm)
  }

  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="student-dialog"
      aria-labelledby="student-dialog-title"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <section className="student-dialog-card">
        <button
          type="button"
          className="dialog-close-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={21} aria-hidden="true" />
        </button>

        <h2 id="student-dialog-title">Add Student</h2>

        <form className="student-form" onSubmit={handleSubmit}>
          <label htmlFor="student-name">
            Student Name:
            <input
              ref={firstInputRef}
              id="student-name"
              name="studentName"
              type="text"
              value={formData.studentName}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>

          <label htmlFor="student-department">
            Department:
            <input
              id="student-department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </label>

          <label htmlFor="student-year">
            Year:
            <input
              id="student-year"
              name="year"
              type="text"
              value={formData.year}
              onChange={handleChange}
              maxLength={60}
              required
            />
          </label>

          <button type="submit" className="submit-student-button">
            Submit
          </button>
        </form>
      </section>
    </dialog>
  )
}

export default Dialog
