import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Workouts from './pages/Workouts'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                  <Routes>
                    <Route
                      path='/'
                      element={<Home />}
                    >
                    </Route>
                    <Route
                      path='/workouts'
                      element={<Workouts />}
                    >
                    </Route>
                  </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
