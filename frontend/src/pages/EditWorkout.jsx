import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import ExerciseCard from '../components/ExerciseCard'
import ExerciseList from '../components/ExerciseList'
import NewExerciseModal from '../components/NewExerciseModal'
import { URL } from '../App'

const EditWorkout = () => {
    const { id } = useParams()
    const [workout, setWorkout] = useState(null)
    const [exerciseCards, setExerciseCards] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(
                `${URL}/api/workout/${id}`
            )
            const json = await response.json()

            if (response.ok) {
                setWorkout(json)
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

    const handleNewExerciseClick = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <div className="edit-page">
            {workout ? (
                <h1 className="edit-title">{workout.name}</h1>
            ) : (
                <CircularProgress />
            )}
            <div className='grid-container'>
                <section className='exercises-display'>
                    {exerciseCards}
                </section>
                <ExerciseList workout={workout}/>
            </div>
            <button onClick={handleNewExerciseClick}>New Exercise</button>
            <NewExerciseModal open={modalOpen} onClose={handleClose} />
        </div>
    )
}

export default EditWorkout
