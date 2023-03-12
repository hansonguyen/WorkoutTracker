import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import { Info } from '@mui/icons-material'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(name, email, password, confirm)
    }

    return (
        <div className="signup-page">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="signup-title">Create Account</h1>

                <label className="signup-label">NAME</label>
                <input
                    className="signup-input"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label className="signup-label">EMAIL</label>
                <input
                    className="signup-input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className="signup-label">
                    PASSWORD{' '}
                    <Tooltip
                        title="Must have at least 8 characters, 1 symbol, 1 number, 1 lowercase and 1 uppercase letter"
                        placement="top"
                    >
                        <Info className="password-info" fontSize="small" />
                    </Tooltip>
                </label>
                <input
                    className="signup-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label className="signup-label">CONFIRM PASSWORD</label>
                <input
                    className="signup-input"
                    type="password"
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                />
                <button className="signup-submit" disabled={isLoading}>
                    Sign Up
                </button>
                <p className="login-text">
                    Already have an account?{' '}
                    <Link className="login-link" to="/login">
                        Login
                    </Link>
                </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup
