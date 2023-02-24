import { Link } from 'react-router-dom'
import homeImage from '../assets/homeImage.svg'

const Home = () => {
    return (
        <div className="home-page">
            <h1 className="home-title">Workout Tracker</h1>
            <div className="home-container">
                <h3 className="home-description">
                    Keep track of your different workouts with custom exercises,
                    sets and reps, and more!
                </h3>
                <img className="home-image" src={homeImage} alt="logo" />
            </div>
            <Link to="/login">
                <button className="home-button">Get Started</button>
            </Link>
        </div>
    )
}

export default Home
