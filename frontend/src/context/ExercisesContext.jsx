import { createContext, useReducer } from 'react'

export const ExercisesContext = createContext()

export const exercisesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXERCISES':
            return {
                exercises: action.payload
            }
        case 'CREATE_EXERCISE':
            return {
                exercises: [action.payload, ...state.exercises]
            }
        case 'DELETE_EXERCISE':
            return {
                exercises: state.exercises.filter(
                    (e) => e._id !== action.payload._id
                )
            }
        case 'UPDATE_EXERCISE':
            return {
                exercises: state.exercises.map((exercise) => {
                    if (exercise._id === action.payload._id) {
                        return action.payload
                    } else {
                        return exercise
                    }
                })
            }
        default:
            return state
    }
}

export const ExercisesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exercisesReducer, {
        exercises: []
    })

    return (
        <ExercisesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExercisesContext.Provider>
    )
}
