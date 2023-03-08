import { useState, useEffect } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { Modal, Checkbox, FormControlLabel } from '@mui/material'
import { Close, AddCircleOutline, AddCircle } from '@mui/icons-material'
import { URL } from '../App'

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

const EditExerciseModal = ({ open, onClose, exerciseid }) => {
    const { dispatch } = useExercisesContext()
    const [exercise, setExercise] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [checkedGroups, setCheckedGroups] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`${URL}/api/exercise/${exerciseid}`)
            const json = await response.json()
            if (response.ok) {
                setExercise(json)
                setName(json.name)
                setDescription(json.description)
                setCheckedGroups(json.muscleGroups)
            }
        }
        fetchExercise()
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
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
        // Handle form submission
        const exercise = { name, description, muscleGroups: checkedGroups }
        const response = await fetch(`${URL}/api/exercise/${exerciseid}`, {
            method: 'PATCH',
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            dispatch({ type: 'UPDATE_EXERCISE', payload: json })
            setEmptyFields([])
            setError(null)
            setName('')
            setDescription('')
            setCheckedGroups([])
            console.log(`Edited ${json.name}`)
            onClose()
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
