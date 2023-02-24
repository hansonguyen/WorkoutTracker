import { useEffect, useState } from 'react'
import WorkoutCard from '../components/WorkoutCard'

const Workouts = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workout')
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }
        fetchWorkouts()
    }, [])

    return (
        <div className="workouts-page">
            <h1 className="workouts-title">Workouts</h1>
            <section className="workouts-display">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutCard workout={workout} />
                    ))}
            </section>
        </div>
    )
}

export default Workouts
