import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseList from '../components/ExerciseList'
import NewExerciseModal from '../components/NewExerciseModal'
import { URL } from '../App'
import { Edit } from '@mui/icons-material'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EditWorkout = () => {
    const { id } = useParams()
    const { dispatch } = useWorkoutsContext()
    const { exercises, dispatch: exerciseDispatch } = useExercisesContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [workout, setWorkout] = useState(null)
    const [exerciseCards, setExerciseCards] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isEditName, setIsEditName] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${URL}/api/workout/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const workoutJSON = await response.json()

            if (response.ok) {
                setWorkout(workoutJSON)
                setName(workoutJSON.name)
                setDescription(workoutJSON.description)
                const cards = await Promise.all(
                    workoutJSON.exercises.map(async (exercise) => {
                        const response = await fetch(
                            `${URL}/api/exercise/${exercise.exercise_id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${user.token}`
                                }
                            }
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
                                    inWorkout={true}
                                />
                            )
                        }
                    })
                )
                setExerciseCards(cards)
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [exercises, dispatch, exerciseDispatch, user])

    const handleEditDescriptionClick = () => {
        setIsEditDescription(true)
    }

    const handleEditNameClick = () => {
        setIsEditName(true)
    }

    // TODO
    const handleNameBlur = async () => {
        if (!user) {
            return
        }
        if (workout.name !== name.trim()) {
            const response = await fetch(`${URL}/api/workout/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ name: name.trim() }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setName(json.name)
            }
        }
        setIsEditName(false)
    }

    const handleDescriptionBlur = async () => {
        if (!user) {
            return
        }
        if (workout.description !== description.trim()) {
            const response = await fetch(`${URL}/api/workout/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ description: description.trim() }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setWorkout(json)
                setDescription(json.description)
            }
        }
        setIsEditDescription(false)
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
                    {!isEditName ? (
                        <h1 className="edit-title">
                            {workout.name}
                            <Tooltip title="Edit name" placement="top">
                                <IconButton onClick={handleEditNameClick}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </h1>
                    ) : (
                        <input
                            className="edit-title"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            onBlur={handleNameBlur}
                            maxLength='14'
                            autoFocus
                        />
                    )}
                </div>
                {!isEditDescription ? (
                    <p className="edit-description">
                        {workout.description}
                        <Tooltip title="Edit description" placement="top">
                            <IconButton onClick={handleEditDescriptionClick}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </p>
                ) : (
                    <input
                        className="edit-description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        onBlur={handleDescriptionBlur}
                        maxLength='100'
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
                {exerciseCards ? (
                    <section className="exercises-display">
                        {exerciseCards}
                    </section>
                ) : (
                    <section className="exercises-display">
                        <h3>No Workouts!</h3>
                    </section>
                )}
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
