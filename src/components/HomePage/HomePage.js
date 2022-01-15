import NewItem from './NewItem';
import WeatherDisplay from './WeatherDisplay';
import TodoItems from './TodoItems';
import pin from './assets/pin.png';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className='home-page-wrapper'>
            <img src={pin} alt='pin' className='pin-image' />
            <div className='home-page-items-wrapper'>
                <TodoItems />
                <NewItem />
            </div>
            <div className='home-page-weather-wrapper'>
                <WeatherDisplay />
            </div>
        </div>
    );
};

export default HomePage;
