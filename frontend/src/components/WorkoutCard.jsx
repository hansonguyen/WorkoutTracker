import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import WorkoutSettings from './WorkoutSettings'

const WorkoutCard = ({ workout }) => {
    return (
        <div className="workout-card">
            <div className="workout-header">
                <h4 className="workout-name">{workout.name}</h4>
                <WorkoutSettings workoutid={workout._id} />
            </div>
            <p className="workout-description">{workout.description}</p>
            <p className="workout-time">
                Created{' '}
                {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true
                })}
            </p>
        </div>
    )
}

export default WorkoutCard
