import { useContext, useEffect, useState } from 'react';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { requester } from '../../../utils/requester';
import './WeatherDisplay.scss';

const WeatherDisplay = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

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

                setLoading(false);
            } catch (e) {
                setLoading(false);
                changeNotificationState(e.message, 'error');
            }
        };

        getWeatherInfo();

        const interval = setInterval(() => getWeatherInfo(), 1000 * 60 * 5);

        return () => clearInterval(interval);
    }, [changeAppState, changeNotificationState]);

    return (
        <div className='weather-display-wrapper'>
            {isLoading ? (
                <p>Loading...</p>
            ) : appState.weather.cityName ? (
                <div className='weather-display'>
                    <p
                        className={`weather-display-temperature ${
                            appState.weather.temperature < 0
                                ? 'weather-display-temperature-negative'
                                : ''
                        }`}
                    >
                        {Math.abs(appState.weather.temperature)}
                    </p>
                    <p className='weather-display-city'>
                        {appState.weather.cityName}
                    </p>
                </div>
            ) : (
                <p>Data unavailable</p>
            )}
        </div>
    );
};

export default WeatherDisplay;
