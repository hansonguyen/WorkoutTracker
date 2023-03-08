import { URL } from '../App'
import ExerciseSettings from './ExerciseSettings'

const ExerciseCard = ({ workout, exercise, sets, reps, load, inWorkout }) => {
    return (
        <div className="exercise-card">
            <div className="exercise-header">
                <h4 className="exercise-name">{exercise.name}</h4>
                <ExerciseSettings
                    workout={workout}
                    exerciseid={exercise._id}
                    inWorkout={inWorkout}
                />
            </div>
            <section className="exercise-middle">
                <p className="exercise-description">{exercise.description}</p>
                {sets && (
                    <p className="exercise-sets">
                        <strong>Sets:</strong> {sets}
                    </p>
                )}
                {reps && (
                    <p className="exercise-reps">
                        <strong>Reps:</strong> {reps}
                    </p>
                )}
                {load >= 0 && (
                    <p className="exercise-load">
                        <strong>Load:</strong> {load}
                    </p>
                )}
            </section>
            <p className="exercise-muscles">
                <strong>Muscle Groups:</strong>{' '}
                {exercise.muscleGroups.join(', ')}
            </p>
        </div>
    )
}

export default ExerciseCard
