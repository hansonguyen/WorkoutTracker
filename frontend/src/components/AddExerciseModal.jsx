import { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Modal, Checkbox, FormControlLabel } from '@mui/material'
import { Close, AddCircleOutline, AddCircle } from '@mui/icons-material'
import { URL } from '../App'

const AddExerciseModal = ({ open, onClose, workout, exerciseid }) => {
    const { dispatch } = useWorkoutsContext()
    const [exercise, setExercise] = useState(null)
    const [sets, setSets] = useState(1)
    const [reps, setReps] = useState(1)
    const [load, setLoad] = useState(0)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`${URL}/api/exercise/${exerciseid}`)
            const json = await response.json()
            if (response.ok) {
                setExercise(json)
            }
        }
        fetchExercise()
    }, [])

    const handleSetsChange = (event) => {
        setSets(event.target.value)
    }

    const handleRepsChange = (event) => {
        setReps(event.target.value)
    }

    const handleLoadChange = (event) => {
        setLoad(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // Handle form submission
        const addedExercise = {
            exercise_id: exerciseid,
            sets: parseInt(sets),
            reps: parseInt(reps),
            load: parseInt(load)
        }
        const response = await fetch(`${URL}/api/workout/${workout._id}`, {
            method: 'POST',
            body: JSON.stringify(addedExercise),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
            setError(null)
            setSets(1)
            setReps(1)
            setLoad(0)
            console.log(`Added ${exercise.name} to ${workout.name}`)
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-exercise-modal-title"
            aria-describedby="add-exercise-modal-description"
        >
            <div className="new-exercise-modal">
                <div className="new-exercise-header">
                    {exercise && <h4>{exercise.name}</h4>}
                    <Close className="new-exercise-close" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="new-exercise-label">Sets</label>
                    <input
                        label="Sets"
                        value={sets}
                        type="number"
                        min="1"
                        onChange={handleSetsChange}
                    />
                    <label className="new-exercise-label">Reps</label>
                    <input
                        label="reps"
                        value={reps}
                        type="number"
                        min="1"
                        onChange={handleRepsChange}
                    />
                    <label className="new-exercise-label">Load</label>
                    <input
                        label="load"
                        value={load}
                        type="number"
                        min="0"
                        onChange={handleLoadChange}
                    />
                    <button className="new-exercise-submit" type="submit">
                        Add
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </Modal>
    )
}

export default AddExerciseModal
