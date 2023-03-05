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
        default:
            return state
    }
}

export const ExercisesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exercisesReducer, {
        exercises: null
    })

    return (
        <ExercisesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExercisesContext.Provider>
    )
}
