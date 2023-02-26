import { useEffect, useState } from 'react'
import { URL } from '../App'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ workout }) => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${URL}/api/exercise`)
            const json = await response.json()

            if (response.ok) {
                let filteredExercises = json
                if (workout && workout.exercises.length > 0) {
                    const exerciseIds = workout.exercises.map(
                        (workoutExercise) => workoutExercise.exercise_id
                    )
                    filteredExercises = json.filter(
                        (exercise) =>
                            !exerciseIds.includes(exercise._id)
                    )
                }
                setExercises(filteredExercises)
            }
        }
        fetchExercises()
    }, [workout])

    if (exercises.length === 0) {
        return <div>No exercises available</div>
    }

    return (
        <section className="exercise-list-display">
            <h1>My Exercises</h1>
            {exercises.map((exercise) => (
                <ExerciseCard 
                    key={exercise._id}
                    exercise={exercise}
                />
            ))}
        </section>
    )
}

export default ExerciseList
