import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseList from '../components/ExerciseList'
import NewExerciseModal from '../components/NewExerciseModal'
import { URL } from '../App'
import { Edit } from '@mui/icons-material'

const EditWorkout = () => {
    const { id } = useParams()
    const [workout, setWorkout] = useState(null)
    const [exerciseCards, setExerciseCards] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${URL}/api/workout/${id}`)
            const json = await response.json()

            if (response.ok) {
                setWorkout(json)
                setDescription(json.description)
                const cards = await Promise.all(
                    json.exercises.map(async (exercise) => {
                        const response = await fetch(
                            `${URL}/api/exercise/${exercise.exercise_id}`
                        )
                        const json = await response.json()

                        if (response.ok) {
                            return (
                                <ExerciseCard
                                    exercise={json}
                                    sets={exercise.sets}
                                    reps={exercise.reps}
                                    load={exercise.load}
                                    key={exercise.exercise_id}
                                />
                            )
                        }
                    })
                )
                setExerciseCards(cards)
            }
        }
        fetchWorkouts()
    }, [])

    const handleEditClick = () => {
        setIsEdit(true)
    }

    // TODO
    const handleDescriptionBlur = async () => {
        if (workout.description !== description) {
            const response = await fetch(`${URL}/api/workout/${id}`, {
                method: 'PATCH',
                body: {
                    description: description
                }
            })
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setDescription(json.description)
                console.log(description)
                console.log(json)
            }
        }
        setIsEdit(false)
    }

    const handleNewExerciseClick = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    const Header = () => {
        return (
            <div className="edit-header">
                <h1 className="edit-title">{workout.name}</h1>
                {!isEdit ? (
                    <p className="edit-description">
                        {workout.description}
                        <Edit onClick={handleEditClick} fontSize="small" />
                    </p>
                ) : (
                    <input
                        className="edit-description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        onBlur={handleDescriptionBlur}
                        autoFocus
                    />
                )}
            </div>
        )
    }

    return (
        <div className="edit-page">
            {workout ? <Header /> : <CircularProgress />}
            <div className="grid-container">
                <section className="exercises-display">{exerciseCards}</section>
                <ExerciseList workout={workout} />
                <div></div>
                <button
                    className="create-exercise-button"
                    onClick={handleNewExerciseClick}
                >
                    Create New Exercise
                </button>
            </div>
            <NewExerciseModal open={modalOpen} onClose={handleClose} />
        </div>
    )
}

export default EditWorkout
