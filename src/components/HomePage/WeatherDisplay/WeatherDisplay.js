import { useContext, useEffect } from 'react';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { requester } from '../../../utils/requester';
import './WeatherDisplay.scss';

const WeatherDisplay = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);

    useEffect(() => {
        const getWeatherInfo = async () => {
            try {
                // const weatherData = await requester(
                //     'GET',
                //     'weather?city=Sofia'
                // );
                // changeAppState({
                //     weather: {
                //         ...weatherData,
                //         temperature: Math.round(weatherData.temperature),
                //     },
                // });
            } catch (e) {
                changeNotificationState(e.message, 'error');
            }
        };

        getWeatherInfo();
    }, []);

    return (
        <div className='weather-display-wrapper'>
            {true ? (
                <div className='weather-display'>
                    <p
                        className={`weather-display-temperature ${
                            appState.weather.temperature < 0
                                ? 'weather-display-temperature-negative'
                                : ''
                        }`}
                    >
                        {21}
                    </p>
                    <p className='weather-display-city'>Stara Zagora</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WeatherDisplay;
