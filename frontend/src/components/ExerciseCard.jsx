import { URL } from "../App"
import ExerciseSettings from "./ExerciseSettings"

const ExerciseCard = ({ exercise, sets, reps, load }) => {
    return (
        <div className="exercise-card">
            <div className="exercise-header">
                <h4 className="exercise-name">{exercise.name}</h4>
                <ExerciseSettings exerciseid={exercise._id} />
            </div>
            <section className="exercise-middle">
                <p className="exercise-description">{exercise.description}</p>
                {sets && <p className="exercise-sets">
                    <strong>Sets:</strong> {sets}
                </p>}
                {reps && <p className="exercise-reps">
                    <strong>Reps:</strong> {reps}
                </p>}
                {load && <p className="exercise-load">
                    <strong>Load:</strong> {load}
                </p>}
            </section>
            <p className="exercise-muscles">
                <strong>Muscle Groups:</strong>{' '}
                {exercise.muscleGroups.join(', ')}
            </p>
        </div>
    )
}

export default ExerciseCard
