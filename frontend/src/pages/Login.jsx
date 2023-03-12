import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { Email } from '@mui/icons-material'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <Link className="login-title-link" to="/">
                    <h1 className="login-title">Workout Tracker</h1>
                </Link>

                <label className="login-label">EMAIL</label>
                <input
                    className="login-input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className="login-label">PASSWORD</label>
                <input
                    className="login-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button className="login-submit" disabled={isLoading}>
                    Login
                </button>
                <p className="sign-up-text">
                    New here?{' '}
                    <Link className="sign-up-link" to="/signup">
                        Sign Up
                    </Link>
                </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login
