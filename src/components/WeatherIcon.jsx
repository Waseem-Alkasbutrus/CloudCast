import { Image } from "react-native";

const images = {
    '01': require('../../assets/icons/weather/01.png'),
    '02': require('../../assets/icons/weather/02.png'),
    '03': require('../../assets/icons/weather/03.png'),
    '04': require('../../assets/icons/weather/04.png'),
    '09': require('../../assets/icons/weather/09.png'),
    '10': require('../../assets/icons/weather/10.png'),
    '11': require('../../assets/icons/weather/11.png'),
    '13': require('../../assets/icons/weather/13.png'),
    '50': require('../../assets/icons/weather/50.png'),
}

export default function WeatherIcon({Condition, style}) {
    let id = Condition.substring(0, 2)
    return (
        <Image style={style} source={images[id]}></Image>
    )
}

