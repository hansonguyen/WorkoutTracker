import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, IconButton } from '@mui/material'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseList from '../components/ExerciseList'
import NewExerciseModal from '../components/NewExerciseModal'
import { URL } from '../App'
import { Edit } from '@mui/icons-material'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useExercisesContext } from '../hooks/useExercisesContext'

const EditWorkout = () => {
    const { id } = useParams()
    const { dispatch } = useWorkoutsContext()
    const { exercises } = useExercisesContext()
    const navigate = useNavigate()
    const [workout, setWorkout] = useState(null)
    const [exerciseCards, setExerciseCards] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${URL}/api/workout/${id}`)
            const workoutJSON = await response.json()

            if (response.ok) {
                setWorkout(workoutJSON)
                setDescription(workoutJSON.description)
                const cards = await Promise.all(
                    workoutJSON.exercises.map(async (exercise) => {
                        const response = await fetch(
                            `${URL}/api/exercise/${exercise.exercise_id}`
                        )
                        const json = await response.json()

                        if (response.ok) {
                            return (
                                <ExerciseCard
                                    workout={workoutJSON}
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
    }, [dispatch, exercises])

    const handleEditClick = () => {
        setIsEdit(true)
    }

    // TODO
    const handleDescriptionBlur = async () => {
        if (workout.description !== description.trim()) {
            const response = await fetch(`${URL}/api/workout/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ description: description.trim() }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setDescription(json.description)
            }
        }
        setIsEdit(false)
    }

    const handleBackClick = () => {
        navigate('/workouts')
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
                <div className="edit-title-container">
                    <h1 className="edit-title">{workout.name}</h1>
                </div>
                {!isEdit ? (
                    <p className="edit-description">
                        {workout.description}
                        <IconButton onClick={handleEditClick}>
                            <Edit fontSize="small" />
                        </IconButton>
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
                <button className="edit-back-button" onClick={handleBackClick}>
                    Back to Workouts
                </button>
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
