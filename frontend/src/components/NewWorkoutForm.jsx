import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { URL } from '../App'

const NewWorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { name, description }

        const response = await fetch(`${URL}/api/workout/`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setDescription('')
            setError(null)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="workout-form" onSubmit={handleSubmit}>
            <h3>New Workout</h3>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => {
                    setName(e.target.value)
                }}
                value={name}
            />
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                value={description}
            />
            <button>Add</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default NewWorkoutForm
