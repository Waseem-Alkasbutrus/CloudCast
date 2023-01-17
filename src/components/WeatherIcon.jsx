import { Image } from "react-native";

const images = {
    '01d': require('../../assets/icons/weather/01d.png'),
    '02d': require('../../assets/icons/weather/02d.png'),
    '03d': require('../../assets/icons/weather/03d.png'),
    '04d': require('../../assets/icons/weather/04d.png'),
    '09d': require('../../assets/icons/weather/09d.png'),
    '10d': require('../../assets/icons/weather/10d.png'),
    '11d': require('../../assets/icons/weather/11d.png'),
    '13d': require('../../assets/icons/weather/13d.png'),
    '50d': require('../../assets/icons/weather/50d.png'),
    '01n': require('../../assets/icons/weather/01n.png'),
    '02n': require('../../assets/icons/weather/02n.png'),
    '03n': require('../../assets/icons/weather/03n.png'),
    '04n': require('../../assets/icons/weather/04n.png'),
    '09n': require('../../assets/icons/weather/09n.png'),
    '10n': require('../../assets/icons/weather/10n.png'),
    '11n': require('../../assets/icons/weather/11n.png'),
    '13n': require('../../assets/icons/weather/13n.png'),
    '50n': require('../../assets/icons/weather/50n.png'),
}

export function getWeatherIconPath(Condition) {
    return images[Condition]
}

export default function WeatherIcon({Condition, style}) {
    return (
        <Image style={style} source={getWeatherIconPath(Condition)}></Image>
    )
}

