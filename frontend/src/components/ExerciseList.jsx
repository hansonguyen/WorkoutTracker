import { useEffect, useState } from 'react'
import { URL } from '../App'
import { useAuthContext } from '../hooks/useAuthContext'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ workout }) => {
    const { exercises, dispatch } = useExercisesContext()
    const { workouts } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [unusedExercises, setUnusedExercises] = useState([])

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${URL}/api/exercise`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_EXERCISES', payload: json })
            }
        }

        fetchExercises()
    }, [dispatch, workouts, user])

    useEffect(() => {
        if (workout) {
            const usedIDs = workout.exercises.map(
                (exercise) => exercise.exercise_id
            )
            const filteredExercises = exercises.filter(
                (exercise) => !usedIDs.includes(exercise._id)
            )
            setUnusedExercises(filteredExercises)
        }
    }, [workout, exercises, workouts])

    return (
        <section className="exercise-list-display">
            {unusedExercises.length > 0 && (
                <h1 className="exercise-list-title">My Exercises</h1>
            )}
            {unusedExercises.length > 0 ? (
                unusedExercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise._id}
                        workout={workout}
                        exercise={exercise}
                        inWorkout={false}
                    />
                ))
            ) : (
                <div className="no-exercises-display">
                    <h3 className="no-exercises-title">No exercises!</h3>
                    <p className="no-exercises-description">Add one below</p>
                </div>
            )}
        </section>
    )
}

export default ExerciseList
