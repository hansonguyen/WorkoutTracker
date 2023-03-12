import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { URL } from '../App'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password, confirm) => {
        setIsLoading(true)
        setError(null)
        if (password !== confirm) {
            setIsLoading(false)
            setError("Passwords don't match")
            return
        }
        const response = await fetch(`${URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
}
