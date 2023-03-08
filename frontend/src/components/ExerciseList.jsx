import { useEffect, useState } from 'react'
import { URL } from '../App'
import { useExercisesContext } from '../hooks/useExercisesContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ workout }) => {
    const { exercises, dispatch } = useExercisesContext()
    const { workouts } = useWorkoutsContext()
    const [unusedExercises, setUnusedExercises] = useState([])

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${URL}/api/exercise`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_EXERCISES', payload: json })
            }
        }

        fetchExercises()
    }, [dispatch, workouts])

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
            <h1 className="exercise-list-title">My Exercises</h1>
            {unusedExercises &&
                unusedExercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise._id}
                        workout={workout}
                        exercise={exercise}
                        inWorkout={false}
                    />
                ))}
        </section>
    )
}

export default ExerciseList
