import { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Modal, Tooltip } from '@mui/material'
import { Close, Info } from '@mui/icons-material'
import { URL } from '../App'

const AddExerciseModal = ({ open, onClose, workout, exerciseid }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [exercise, setExercise] = useState(null)
    const [sets, setSets] = useState(1)
    const [reps, setReps] = useState(1)
    const [load, setLoad] = useState(0)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`${URL}/api/exercise/${exerciseid}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setExercise(json)
            }
        }
        fetchExercise()
    }, [user])

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
        if (!user) {
            setError('You must be logged in')
            return
        }
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
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
            setError(null)
            setEmptyFields([])
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
                    {exercise && <h4>Add {exercise.name}</h4>}
                    <Close className="new-exercise-close" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="add-exercise-label">
                        Sets
                        <Tooltip
                            title="Sets must be greater than 0"
                            placement="top"
                            >
                            <Info className='add-exercise-info' fontSize="small" />
                        </Tooltip>
                    </label>
                    <input
                        className={`new-exercise-input ${
                            emptyFields.includes('sets') ? 'input-error' : ''
                        }`}
                        label="Sets"
                        value={sets}
                        type="number"
                        onChange={handleSetsChange}
                    />
                    <label className="add-exercise-label">
                        Reps
                        <Tooltip
                            title="Reps must be greater than 0"
                            placement="top"
                            >
                            <Info className='add-exercise-info' fontSize="small" />
                        </Tooltip>
                    </label>
                    <input
                        className={`new-exercise-input ${
                            emptyFields.includes('reps') ? 'input-error' : ''
                        }`}
                        label="reps"
                        value={reps}
                        type="number"
                        onChange={handleRepsChange}
                    />
                    <label className="add-exercise-label">
                        Load
                        <Tooltip
                            title="Load must be at least 0"
                            placement="top"
                            >
                            <Info className='add-exercise-info' fontSize="small" />
                        </Tooltip>
                    </label>
                    <input
                        className={`new-exercise-input ${
                            emptyFields.includes('load') ? 'input-error' : ''
                        }`}
                        label="load"
                        value={load}
                        type="number"
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
