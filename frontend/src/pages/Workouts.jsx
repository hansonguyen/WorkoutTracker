import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import WorkoutCard from '../components/WorkoutCard'
import NewWorkoutForm from '../components/NewWorkoutForm'
import { URL } from '../App'

const Workouts = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { logout } = useLogout()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${URL}/api/workout`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [user])

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="workouts-page">
            {user && (
                <div className="workouts-page-header">
                    <h1 className="workouts-title">{user.name}'s Workouts</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
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
