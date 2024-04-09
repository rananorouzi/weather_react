import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CheckWeatherSVG from '../CheckWeatherSVG';
describe('test CheckWeatherSVG component' , () => {

  test('get svg element with valid number', () => {
    render(<CheckWeatherSVG props={{code:45}} />);
    expect(screen.getByRole('weather_svg_icon')).toBeInTheDocument();
  });

  test('get svg element with invalid number', () => {
      render(<CheckWeatherSVG props={{code:88888}} />);
      expect(screen.getByRole('weather_svg_icon')).toBeInTheDocument();
  });

    
  test('get svg element with no param', () => {
      const svg = renderer.create(<CheckWeatherSVG />).toJSON();
      expect(svg).toBeNull();
  });
});