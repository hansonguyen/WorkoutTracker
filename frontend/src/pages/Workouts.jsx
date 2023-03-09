import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutCard from '../components/WorkoutCard'
import NewWorkoutForm from '../components/NewWorkoutForm'
import { URL } from '../App'

const Workouts = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${URL}/api/workout`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        fetchWorkouts()
    }, [])

    return (
        <div className="workouts-page">
            <h1 className="workouts-title">Workouts</h1>
            <div className="grid-container">
                <section className="workouts-display">
                    {workouts.length > 0 ? (
                        workouts.map((workout) => (
                            <WorkoutCard key={workout._id} workout={workout} />
                        ))
                    ) : (
                        <div className="no-workouts-display">
                            <h3 className="no-workouts-title">
                                No workouts yet!
                            </h3>
                            <p className="no-workouts-description">
                                Create one to get started
                            </p>
                        </div>
                    )}
                </section>
                <NewWorkoutForm />
            </div>
        </div>
    )
}

export default Workouts
