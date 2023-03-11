import { useState, useEffect } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { Modal, Checkbox, FormControlLabel, Tooltip } from '@mui/material'
import { Close, AddCircleOutline, AddCircle, Info } from '@mui/icons-material'
import { URL } from '../App'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const muscleGroups = [
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Quads',
    'Hamstrings',
    'Calves',
    'Abs'
]

const EditExerciseModal = ({
    open,
    onClose,
    workout,
    exerciseid,
    inWorkout
}) => {
    const { exercises, dispatch } = useExercisesContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [exercise, setExercise] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [sets, setSets] = useState(1)
    const [reps, setReps] = useState(1)
    const [load, setLoad] = useState(0)
    const [checkedGroups, setCheckedGroups] = useState([])
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
                setName(json.name)
                setDescription(json.description)
                setCheckedGroups(json.muscleGroups)
                if (workout) {
                    workout.exercises.map((exercise) => {
                        if (exercise.exercise_id === exerciseid) {
                            setSets(exercise.sets)
                            setReps(exercise.reps)
                            setLoad(exercise.load)
                        }
                    })
                }
            }
        }
        fetchExercise()
    }, [user])

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleSetsChange = (event) => {
        setSets(event.target.value)
    }

    const handleRepsChange = (event) => {
        setReps(event.target.value)
    }

    const handleLoadChange = (event) => {
        setLoad(event.target.value)
    }

    const handleGroupChange = (event) => {
        const { value } = event.target
        setCheckedGroups((prevChecked) => {
            if (prevChecked.includes(value)) {
                return prevChecked.filter((group) => group !== value)
            }
            return [...prevChecked, value]
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        // Handle form submission
        const exercise = { name, description, muscleGroups: checkedGroups }
        const response = await fetch(`${URL}/api/exercise/${exerciseid}`, {
            method: 'PATCH',
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (inWorkout) {
            const updatedExercises = workout.exercises.map((exercise) => {
                if (exercise.exercise_id === exerciseid) {
                    return {
                        exercise_id: exerciseid,
                        sets: parseInt(sets),
                        reps: parseInt(reps),
                        load: parseInt(load)
                    }
                } else {
                    return exercise
                }
            })
            const newWorkout = {
                ...workout,
                exercises: updatedExercises
            }
            const response2 = await fetch(`${URL}/api/workout/${workout._id}`, {
                method: 'PATCH',
                body: JSON.stringify(newWorkout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json2 = await response2.json()
            if (!response.ok || !response2.ok) {
                setError(json.error || json2.error)
                const concat = (...arrays) =>
                    [].concat(...arrays.filter(Array.isArray))
                setEmptyFields(concat(json.emptyFields, json2.emptyFields))
            }
            if (response.ok && response2.ok) {
                dispatch({ type: 'UPDATE_EXERCISE', payload: json })
                workoutsDispatch({ type: 'UPDATE_WORKOUT', payload: json2 })
                setEmptyFields([])
                setError(null)
                console.log(`Edited ${json.name} in ${workout.name}`)
                onClose()
            }
        } else {
            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
                setEmptyFields(json.emptyFields)
            }
            if (response.ok) {
                dispatch({ type: 'UPDATE_EXERCISE', payload: json })
                setEmptyFields([])
                setError(null)
                console.log(`Edited ${json.name}`)
                onClose()
            }
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-exercise-modal-title"
            aria-describedby="edit-exercise-modal-description"
        >
            <div className="new-exercise-modal">
                <div className="new-exercise-header">
                    {exercise && <h4>Edit {exercise.name}</h4>}
                    <Close className="new-exercise-close" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="new-exercise-label">Name</label>
                    <input
                        className={`new-exercise-input ${
                            emptyFields.includes('name') ? 'input-error' : ''
                        }`}
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <label className="new-exercise-label">Description</label>
                    <input
                        className={`new-exercise-input ${
                            emptyFields.includes('description')
                                ? 'input-error'
                                : ''
                        }`}
                        label="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    {inWorkout && (
                        <div>
                            <label className="add-exercise-label">
                                Sets
                                <Tooltip
                                    title="Sets must be greater than 0"
                                    placement="top"
                                >
                                    <Info
                                        className="add-exercise-info"
                                        fontSize="small"
                                    />
                                </Tooltip>
                            </label>
                            <input
                                className={`new-exercise-input ${
                                    emptyFields.includes('sets')
                                        ? 'input-error'
                                        : ''
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
                                    <Info
                                        className="add-exercise-info"
                                        fontSize="small"
                                    />
                                </Tooltip>
                            </label>
                            <input
                                className={`new-exercise-input ${
                                    emptyFields.includes('reps')
                                        ? 'input-error'
                                        : ''
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
                                    <Info
                                        className="add-exercise-info"
                                        fontSize="small"
                                    />
                                </Tooltip>
                            </label>
                            <input
                                className={`new-exercise-input ${
                                    emptyFields.includes('load')
                                        ? 'input-error'
                                        : ''
                                }`}
                                label="load"
                                value={load}
                                type="number"
                                onChange={handleLoadChange}
                            />
                        </div>
                    )}
                    <div className="new-exercise-muscles">
                        {muscleGroups.map((group) => (
                            <FormControlLabel
                                key={group}
                                className="new-exercise-checkbox"
                                control={
                                    <Checkbox
                                        value={group}
                                        checked={checkedGroups.includes(group)}
                                        icon={
                                            <AddCircleOutline
                                                color={`${
                                                    emptyFields.includes(
                                                        'muscleGroups'
                                                    )
                                                        ? 'error'
                                                        : ''
                                                }`}
                                            />
                                        }
                                        checkedIcon={<AddCircle />}
                                        onChange={handleGroupChange}
                                    />
                                }
                                label={group}
                            />
                        ))}
                    </div>
                    <button className="new-exercise-submit" type="submit">
                        Confirm
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </Modal>
    )
}

export default EditExerciseModal
