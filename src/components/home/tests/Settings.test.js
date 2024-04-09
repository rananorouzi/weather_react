import React from 'react';
import renderer from 'react-test-renderer';

import {Setting, TempUnitButtons} from '../Settings';
describe('test setting component' , () => {
  it('performs snapshot testing for setting', () => {
    const settingButton = renderer.create(<Setting />).toJSON();
    expect(settingButton).toMatchSnapshot();
  });


  it('performs snapshot testing for temp buttons', () => {
    const sampleParam = {
          tmp: 'c',
          buttonClassNames: {
            active: 'bg-blue-500 text-white',
            deactive: 'text-slate-900 bg-white'
          }
        };
      const tempButton = renderer.create(<TempUnitButtons buttonParams = {sampleParam}/>).toJSON();
      expect(tempButton).toMatchSnapshot();
    });

  it('performs snapshot testing for empty params to temp buttons', () => {
      const tempButton = renderer.create(<TempUnitButtons buttonParams = {{}}/>).toJSON();
      expect(tempButton).toBeNull();
    });
});