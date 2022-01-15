import NewItem from './NewItem';
import WeatherDisplay from './WeatherDisplay';
import TodoItems from './TodoItems';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className='home-page-wrapper'>
            <div className='home-page-items-wrapper'>
                <TodoItems/>
                <NewItem />
            </div>
            <div className='home-page-weather-wrapper'>
                <WeatherDisplay />
            </div>
        </div>
    );
};

export default HomePage;
