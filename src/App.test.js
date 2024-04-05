import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Weather from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('test weather component', () => {
    it('renders correctly', () => {
    const wrapper = shallow(<Weather />);
    expect(wrapper.find('span').text()).toEqual('Weather');
});
});