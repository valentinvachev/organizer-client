import ActiveTasks from './ActiveTasks';
import NewTask from './NewTask';
import WeatherDisplay from './WeatherDisplay';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className='home-page-wrapper'>
            <div className='home-page-tasks-wrapper'>
                <ActiveTasks />
                <NewTask />
            </div>
            <div className='home-page-weather-wrapper'>
                <WeatherDisplay />
            </div>
        </div>
    );
};

export default HomePage;
