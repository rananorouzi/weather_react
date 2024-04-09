import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import {weatherCodes} from './data/weather-codes'
import {FormatDateToMonthDay } from './components/home/FormatDate'
import CreateCurrentWeatherHTML from './components/home/CreateCurrentWeatherHTML'
import CreateDailyWeatherHTML from './components/home/CreateDailyWeatherHTML'
import CreateChart from './components/home/CreateChart'

// TODO list:
// 1. Add linter and prettier to project
// 2. Add a pre-commit hook to run linter and prettier like husky
// 3. JS? Why? Why not TS?
// 4. Break down the file into smaller components/functions


function Weather() {

    const [data, setData] = useState([]);
    const [tmp, setTmp] = useState('c');
    let weatherUrl = 'https://api.open-meteo.com/v1/forecast';
    let weatherParams = {
        latitude: '65.01',
        longitude: '25.47',
        current: 'temperature_2m,weather_code,wind_speed_10m',
        hourly: 'temperature_2m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        models: 'best_match'
    };
    let currentWeather = {};
    let weekWeather = {};
    let hourlyData = [];

    if(tmp === 'f'){
        weatherParams.temperature_unit = 'fahrenheit';
    }
    weatherUrl = (weatherUrl+'?' + Object
        .keys(weatherParams)
        .map(function (key) {
            return key + '=' + encodeURIComponent(weatherParams[key])
        })
        .join('&'));
    useEffect(() => {
        fetch(weatherUrl)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [weatherUrl]);
    if (Object.keys(data).length > 0) {
        // create current data
        currentWeather = {
            'time': data['current']['time'],
            'weather_code': data['current']['weather_code'],
            'weather_code_des': weatherCodes[data['current']['weather_code']]['name'],
            'wind_speed': data['current']['wind_speed_10m'],
            'wind_speed_unit': data['current_units']['wind_speed_10m'],
            'temperature_2m': data['current']['temperature_2m'],
            'temp_unit': data['current_units']['temperature_2m']
        };

        //create daily data
        if (typeof data['daily'] == 'object') {
            weekWeather = {
                'forecast': {}, 'unit': {
                    'max_unit': data['daily_units']['temperature_2m_max'],
                    'min_unit': data['daily_units']['temperature_2m_min']
                }
            };
            const weekTimes = data['daily']['time'];
            const weekdailys = data['daily'];
            for (let i in weekTimes) {
                weekWeather['forecast'][i] = {
                    'time': weekTimes[i],
                    'weather_code': weekdailys['weather_code'][i],
                    'weather_code_des': weatherCodes[weekdailys['weather_code'][i]]['name'],
                    'min_temp': weekdailys['temperature_2m_min'][i],
                    'max_temp': weekdailys['temperature_2m_max'][i]

                };

            }

        }
        const hTimes = data['hourly']['time'];
        for (let h in hTimes) {
           hourlyData[h] = [<FormatDateToMonthDay date="hTimes[h]" />, data['hourly']['temperature_2m'][h]]
        }

    }
    const onClickTempHandler = (temp) => {
        (temp === 'f')? setTmp('f') : setTmp('c');
    }
    const onClickRefHandler = () => {
            fetch(weatherUrl)
                .then((res) => res.json())
                .then((data) => setData(data));
    }
    const buttonClassNames = {
        active:'bg-blue-500 text-white',
        deactive: 'text-slate-900 bg-white'
    }
    return (
        <div className="container px-5">
            <div className="flex items-stretch justify-between flex-wrap div_center">
                <div className="left_header align-middle flex">
                    <div className="inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                             viewBox="0,0,256,256">
                            <g transform="translate(67.84,67.84) scale(0.47,0.47)">
                                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt"
                                   strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray=""
                                   strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"
                                   textAnchor="none">
                                    <g transform="scale(4,4)">
                                        <path transform="translate(-5.65041,57.09961) rotate(-78.69)"
                                              d="M32,11c-11.59798,0 -21,9.40202 -21,21c0,11.59798 9.40202,21 21,21c11.59798,0 21,-9.40202 21,-21c0,-11.59798 -9.40202,-21 -21,-21z"
                                              fill="#f9f8ae"></path>
                                        <path
                                            d="M36.12,11.41c-6.48123,-1.30786 -13.19934,0.52368 -18.12,4.94c-0.69114,0.60779 -1.06505,1.49919 -1.01432,2.41817c0.05073,0.91897 0.52048,1.76381 1.27432,2.29183v0c1.14943,0.80431 2.7028,0.70463 3.74,-0.24c3.58659,-3.20066 8.48989,-4.48846 13.18636,-3.46327c4.69647,1.02519 8.61708,4.23916 10.54364,8.64327c0.58131,1.40215 2.11832,2.14918 3.58,1.74v0c0.82365,-0.22448 1.51265,-0.78923 1.89443,-1.55279c0.38178,-0.76356 0.42018,-1.65361 0.10557,-2.44721c-2.71406,-6.36811 -8.39989,-10.9834 -15.19,-12.33z"
                                            fill="#faefde"></path>
                                        <path
                                            d="M24.51,51.62c6.16823,2.36037 13.08869,1.67092 18.67,-1.86c0.78388,-0.48375 1.30208,-1.30081 1.40551,-2.21611c0.10344,-0.91531 -0.21935,-1.8274 -0.87551,-2.47389v0c-0.99568,-0.97655 -2.53302,-1.13816 -3.71,-0.39c-4.06984,2.56038 -9.12042,3.01453 -13.58174,1.22129c-4.46133,-1.79324 -7.79259,-5.61649 -8.95826,-10.28129c-0.34049,-1.47852 -1.73125,-2.47008 -3.24,-2.31v0c-0.84271,0.09643 -1.60522,0.54509 -2.09877,1.23492c-0.49355,0.68983 -0.67202,1.55636 -0.49123,2.38508c1.606,6.72217 6.42549,12.21894 12.88,14.69z"
                                            fill="#f6d397"></path>
                                        <path
                                            d="M32,10c-12.15026,0 -22,9.84974 -22,22c0,12.15026 9.84974,22 22,22c12.15026,0 22,-9.84974 22,-22c0,-12.15026 -9.84974,-22 -22,-22zM32,52c-11.04569,0 -20,-8.95431 -20,-20c0,-11.04569 8.95431,-20 20,-20c11.04569,0 20,8.95431 20,20c0,11.04569 -8.95431,20 -20,20z"
                                            fill="#fcc319"></path>
                                        <path
                                            d="M42.08,19.58c-0.2745,-0.24681 -0.66265,-0.32232 -1.00967,-0.19642c-0.34701,0.1259 -0.59644,0.43274 -0.64882,0.79815c-0.05238,0.36541 0.10081,0.72996 0.39849,0.94827c0.54117,0.4386 1.04922,0.91657 1.52,1.43c0.37279,0.40869 1.00631,0.43779 1.415,0.065c0.40869,-0.37279 0.43779,-1.00631 0.065,-1.415c-0.53918,-0.58533 -1.12075,-1.13014 -1.74,-1.63zM21.9,21.91c0.24784,-0.00065 0.4866,-0.0933 0.67,-0.26c3.94349,-3.57014 9.5696,-4.59694 14.52,-2.65c0.50643,0.17385 1.05994,-0.08205 1.25557,-0.58048c0.19562,-0.49843 -0.03607,-1.0625 -0.52557,-1.27952c-5.66879,-2.21387 -12.10272,-1.0201 -16.6,3.08c-0.30538,0.27757 -0.4089,0.71423 -0.2606,1.09934c0.14829,0.38512 0.51793,0.63958 0.9306,0.64066zM32,8c0.55228,0 1,-0.44772 1,-1v-6c0,-0.55228 -0.44772,-1 -1,-1c-0.55228,0 -1,0.44772 -1,1v6c0,0.55228 0.44772,1 1,1zM32,56c-0.55228,0 -1,0.44772 -1,1v6c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1v-6c0,-0.55228 -0.44772,-1 -1,-1zM8,32c0,-0.55228 -0.44772,-1 -1,-1h-6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1h6c0.55228,0 1,-0.44772 1,-1zM63,31h-6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1h6c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM21.71,9.19c0.11836,0.35256 0.42259,0.61032 0.78981,0.66916c0.36722,0.05883 0.73675,-0.09098 0.95933,-0.38892c0.22258,-0.29794 0.26143,-0.69479 0.10086,-1.03024l-1.5,-3.71c-0.11836,-0.35256 -0.42259,-0.61032 -0.78981,-0.66916c-0.36722,-0.05883 -0.73675,0.09098 -0.95933,0.38892c-0.22258,0.29794 -0.26143,0.69479 -0.10086,1.03024zM42.29,54.81c-0.11836,-0.35256 -0.42259,-0.61032 -0.78981,-0.66916c-0.36722,-0.05883 -0.73675,0.09098 -0.95933,0.38892c-0.22258,0.29794 -0.26143,0.69479 -0.10086,1.03024l1.5,3.71c0.11836,0.35256 0.42259,0.61032 0.78981,0.66916c0.36722,0.05883 0.73675,-0.09098 0.95933,-0.38892c0.22258,-0.29794 0.26143,-0.69479 0.10086,-1.03024zM9.75,41c-0.2079,-0.51008 -0.78915,-0.75599 -1.3,-0.55l-3.71,1.5c-0.35256,0.11836 -0.61032,0.42259 -0.66916,0.78981c-0.05883,0.36722 0.09098,0.73675 0.38892,0.95933c0.29794,0.22258 0.69479,0.26143 1.03024,0.10086l3.71,-1.5c0.51008,-0.2079 0.75599,-0.78915 0.55,-1.3zM54.25,23c0.2079,0.51008 0.78915,0.75599 1.3,0.55l3.71,-1.5c0.47671,-0.22818 0.69355,-0.78791 0.49499,-1.2777c-0.19856,-0.48979 -0.74396,-0.7405 -1.24499,-0.5723l-3.71,1.5c-0.51008,0.2079 -0.75599,0.78915 -0.55,1.3zM41,9.75c0.51085,0.20599 1.0921,-0.03992 1.3,-0.55l1.5,-3.71c0.16057,-0.33545 0.12172,-0.7323 -0.10086,-1.03024c-0.22258,-0.29794 -0.59211,-0.44775 -0.95933,-0.38892c-0.36722,0.05883 -0.67145,0.31659 -0.78981,0.66916l-1.5,3.71c-0.20599,0.51085 0.03992,1.0921 0.55,1.3zM23,54.25c-0.51085,-0.20599 -1.0921,0.03992 -1.3,0.55l-1.5,3.71c-0.16057,0.33545 -0.12172,0.7323 0.10086,1.03024c0.22258,0.29794 0.59211,0.44775 0.95933,0.38892c0.36722,-0.05883 0.67145,-0.31659 0.78981,-0.66916l1.5,-3.71c0.20599,-0.51085 -0.03992,-1.0921 -0.55,-1.3zM59.26,41.94l-3.71,-1.5c-0.50103,-0.1682 -1.04643,0.08252 -1.24499,0.5723c-0.19856,0.48979 0.01828,1.04952 0.49499,1.2777l3.71,1.5c0.50103,0.1682 1.04643,-0.08252 1.24499,-0.5723c0.19856,-0.48979 -0.01828,-1.04952 -0.49499,-1.2777zM4.74,22.06l3.71,1.5c0.50103,0.1682 1.04643,-0.08252 1.24499,-0.5723c0.19856,-0.48979 -0.01828,-1.04952 -0.49499,-1.2777l-3.71,-1.5c-0.50103,-0.1682 -1.04643,0.08252 -1.24499,0.5723c-0.19856,0.48979 0.01828,1.04952 0.49499,1.2777zM13.62,15c0.39531,0.25059 0.91155,0.19347 1.24251,-0.13749c0.33096,-0.33096 0.38808,-0.8472 0.13749,-1.24251l-4.21,-4.25c-0.39676,-0.33978 -0.98819,-0.31693 -1.35756,0.05244c-0.36937,0.36937 -0.39221,0.9608 -0.05244,1.35756zM50.38,49c-0.39531,-0.25059 -0.91155,-0.19347 -1.24251,0.13749c-0.33096,0.33096 -0.38808,0.8472 -0.13749,1.24251l4.24,4.24c0.39676,0.33978 0.98819,0.31693 1.35756,-0.05244c0.36937,-0.36937 0.39221,-0.9608 0.05244,-1.35756zM13.62,49l-4.25,4.21c-0.28538,0.24439 -0.40968,0.62812 -0.32181,0.99342c0.08787,0.3653 0.37309,0.65052 0.73839,0.73839c0.3653,0.08787 0.74903,-0.03643 0.99342,-0.32181l4.22,-4.24c0.25059,-0.39531 0.19347,-0.91155 -0.13749,-1.24251c-0.33096,-0.33096 -0.8472,-0.38808 -1.24251,-0.13749zM49.68,15.32c0.2658,0.00154 0.52128,-0.10281 0.71,-0.29l4.24,-4.24c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244l-4.22,4.24c-0.28846,0.28609 -0.37516,0.71827 -0.21937,1.09348c0.15579,0.37521 0.52311,0.61888 0.92937,0.61652zM32,44c-0.55228,0 -1,0.44772 -1,1v2c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1v-2c0,-0.55228 -0.44772,-1 -1,-1zM37.8,43.68c-0.11836,-0.35256 -0.42259,-0.61032 -0.78981,-0.66916c-0.36722,-0.05883 -0.73675,0.09098 -0.95933,0.38892c-0.22258,0.29794 -0.26143,0.69479 -0.10086,1.03024l0.75,1.85c0.11836,0.35256 0.42259,0.61032 0.78981,0.66916c0.36722,0.05883 0.73675,-0.09098 0.95933,-0.38892c0.22258,-0.29794 0.26143,-0.69479 0.10086,-1.03024zM27.5,43.13c-0.51085,-0.20599 -1.0921,0.03992 -1.3,0.55l-0.75,1.85c-0.16057,0.33545 -0.12172,0.7323 0.10086,1.03024c0.22258,0.29794 0.59211,0.44775 0.95933,0.38892c0.36722,-0.05883 0.67145,-0.31659 0.78981,-0.66916l0.75,-1.85c0.20599,-0.51085 -0.03992,-1.0921 -0.55,-1.3zM22.1,40.49l-1.41,1.41c-0.28538,0.24439 -0.40968,0.62812 -0.32181,0.99342c0.08787,0.3653 0.37309,0.65052 0.73839,0.73839c0.3653,0.08787 0.74903,-0.03643 0.99342,-0.32181l1.41,-1.41c0.33978,-0.39676 0.31693,-0.98819 -0.05244,-1.35756c-0.36937,-0.36937 -0.9608,-0.39221 -1.35756,-0.05244zM21,36.69c-0.21571,-0.50778 -0.80189,-0.74494 -1.31,-0.53l-1.84,0.78c-0.34273,0.12987 -0.58695,0.43682 -0.63648,0.79997c-0.04953,0.36315 0.10356,0.72429 0.39899,0.94121c0.29543,0.21691 0.68585,0.25483 1.01749,0.09883l1.79,-0.78c0.2529,-0.09389 0.45715,-0.28597 0.56636,-0.53264c0.10921,-0.24667 0.11413,-0.52701 0.01364,-0.77736z"
                                            fill="#fcc319"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <span className="inline-block text-black font-sans text-xl font-bold self-center">Weather</span>
                </div>
                <div className="right_icons temp_chose self-center justify-en flex justify-items-end  mb-3">
                    <button
                        onClick={() =>onClickRefHandler()}
                        className="active z-[2] text-slate-900	inline-block rounded bg-white border border-solid border-gray-400 mr-4 rounded-lg px-2 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        type="button"
                        id="refresh"
                        data-testid="refresh"
                        data-te-ripple-init>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15"
                             viewBox="0 0 30 30">
                            <path
                                d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                        </svg>
                    </button>

                    <button
                        onClick={() => onClickTempHandler('c')}
                        className={(tmp === 'c' ? buttonClassNames.active : buttonClassNames.deactive) +" z-[2] inline-block rounded-l-lg border border-solid border-r-0 border-gray-400 px-4 pb-2 pt-2.5 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"}
                        type="button"
                        id="temp_c"
                        data-te-ripple-init>
                        °C
                    </button>
                    <button
                        onClick={() => onClickTempHandler('f')}
                        className={(tmp === 'f' ? buttonClassNames.active : buttonClassNames.deactive) + " z-[2] inline-block rounded-r-lg border border-solid border-gray-400 px-5 pb-2 pt-2.5 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"}
                        type="button"
                        id="temp_f"
                        data-te-ripple-init>
                        °F
                    </button>
                </div>

            </div>
            <div className="overflow-hidden container lg:flex  gap-3 font-sans div_center">

                <div id="left_col"
                     className="flex-1 bg-white border border-gray-200 rounded-lg shadow mb-2 lg:mb-0">
                    <div id="current" className="p-3 lg:p-5 w-full">
                        <CreateCurrentWeatherHTML currentWeather={currentWeather} />
                    </div>
                </div>
                <div id="right_col" className="bg-white border border-gray-200 rounded-lg shadow">

                    <div id="week" className="p-3 lg:p-5 mb-4">
                        <CreateDailyWeatherHTML weekWeather={weekWeather} />
                    </div>
                    <div id="chart">
                        <CreateChart chartData={hourlyData}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Weather;