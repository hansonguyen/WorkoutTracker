import { useState } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { useAuthContext } from '../hooks/useAuthContext'
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

const NewExerciseModal = ({ open, onClose }) => {
    const { dispatch } = useExercisesContext()
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [checkedGroups, setCheckedGroups] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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
        if (!user) {
            setError('You must be logged in')
            return
        }
        // Handle form submission
        const exercise = { name, description, muscleGroups: checkedGroups }
        const response = await fetch(`${URL}/api/exercise`, {
            method: 'POST',
            body: JSON.stringify(exercise),
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
            setCheckedGroups([])
            dispatch({ type: 'CREATE_EXERCISE', payload: json })
            onClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="new-exercise-modal-title"
            aria-describedby="new-exercise-modal-description"
        >
            <div className="new-exercise-modal">
                <div className="new-exercise-header">
                    <h4>New Exercise</h4>
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
                        maxLength='16'
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
                        maxLength='80'
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
                        Create
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </Modal>
    )
}

export default NewExerciseModal
