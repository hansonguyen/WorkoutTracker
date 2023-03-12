import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { URL } from '../App'

const NewWorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const workout = { name, description }

        const response = await fetch(`${URL}/api/workout/`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setName('')
            setDescription('')
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="workout-form" onSubmit={handleSubmit}>
            <h3 className="workout-form-title">New Workout</h3>
            <label className="workout-form-label">Name:</label>
            <input
                className={`workout-form-input ${
                    emptyFields.includes('name') ? 'input-error' : ''
                }`}
                type="text"
                onChange={(e) => {
                    setName(e.target.value)
                }}
                value={name}
                maxLength='14'
            />
            <label className="workout-form-label">Description:</label>
            <input
                className={`workout-form-input ${
                    emptyFields.includes('description') ? 'input-error' : ''
                }`}
                type="text"
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                value={description}
                maxLength="100"
            />
            <button className="workout-form-submit" type="submit">
                Add
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default NewWorkoutForm
