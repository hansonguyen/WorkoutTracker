import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Workouts from './pages/Workouts'
import EditWorkout from './pages/EditWorkout'

export const URL = import.meta.env.VITE_SERVER_URL

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/workouts" element={<Workouts />} />
                <Route
                    exact
                    path="/workouts/:id/edit"
                    element={<EditWorkout />}
                />
            </Routes>
        </Router>
    )
}

export default App
