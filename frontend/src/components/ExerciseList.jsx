import { useEffect } from 'react'
import { URL } from '../App'
import { useExercisesContext } from '../hooks/useExercisesContext'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ workout }) => {
    const { exercises, dispatch } = useExercisesContext()

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${URL}/api/exercise`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_EXERCISES', payload: json })
            }
        }
        fetchExercises()
    }, [])

    return (
        <section className="exercise-list-display">
            <h1 className="exercise-list-title">My Exercises</h1>
            {exercises &&
                exercises.map((exercise) => (
                    <ExerciseCard key={exercise._id} workout={workout} exercise={exercise} />
                ))}
        </section>
    )
}

export default ExerciseList
