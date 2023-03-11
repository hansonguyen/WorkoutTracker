import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Workouts from './pages/Workouts'
import EditWorkout from './pages/EditWorkout'

export const URL = import.meta.env.VITE_SERVER_URL

function App() {
    const { user } = useAuthContext()

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/workouts" />}></Route>
                <Route exact path="/signup" element={!user ? <Signup /> : <Navigate to="/workouts" />}></Route>
                <Route exact path="/workouts" element={user ? <Workouts /> : <Navigate to="/"/>} />
                <Route
                    exact
                    path="/workouts/:id/edit"
                    element={user ? <EditWorkout /> : <Navigate to="/"/>}
                />
            </Routes>
        </Router>
    )
}

export default App
