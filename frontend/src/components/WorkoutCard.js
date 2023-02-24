import { IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutCard = ({ workout }) => {
    return (
        <div className="workout-card">
            <div className="workout-header">
                <h4 className="workout-name">{workout.name}</h4>
                <IconButton aria-label='settings'>
                    <MoreVert />
                </IconButton>
            </div>
            <p className="workout-description">{workout.description}</p>
            <p className="workout-time">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default WorkoutCard
