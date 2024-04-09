import React from 'react';
import CreateChart from '../CreateChart';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { configure,mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({adapter: new Adapter()});
describe('test highchart' , () => {
  test('highchart with valid params', () => {
    const sampleParam = {
        "forecast": {
          "0": {
            "time": "2024-04-09",
            "weather_code": 3,
            "weather_code_des": "overcast",
            "min_temp": 1.3,
            "max_temp": 10.9
          },
          "1": {
            "time": "2024-04-10",
            "weather_code": 53,
            "weather_code_des": "Drizzle: moderate",
            "min_temp": 2,
            "max_temp": 7
          },
          "2": {
            "time": "2024-04-11",
            "weather_code": 51,
            "weather_code_des": "Drizzle: Light",
            "min_temp": -0.2,
            "max_temp": 5.8
          },
          "3": {
            "time": "2024-04-12",
            "weather_code": 61,
            "weather_code_des": "Rain: Slight",
            "min_temp": -1.6,
            "max_temp": 4.2
          },
          "4": {
            "time": "2024-04-13",
            "weather_code": 61,
            "weather_code_des": "Rain: Slight",
            "min_temp": -0.1,
            "max_temp": 4.7
          }
        },
        "unit": {
          "max_unit": "°C",
          "min_unit": "°C"
        }
    };
    const chart = mount(<CreateChart chartData={sampleParam}/>);
    expect(chart).toMatchSnapshot();
  });

  test('highchart with invalid params', () => {
    render(<CreateChart />);
      const error = screen.getByText('Invalid parameter!');
      expect(error).toBeInTheDocument();

  });
});
