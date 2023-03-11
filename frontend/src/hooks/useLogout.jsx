import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'
import { useExercisesContext } from './useExercisesContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { dispatch: exercisesDispatch } = useExercisesContext()

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user')

        // Dispatch logout action and clear context
        dispatch({ type: 'LOGOUT' })
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: [] })
        exercisesDispatch({ type: 'SET_EXERCISES', payload: [] })
    }

    return { logout }
}
