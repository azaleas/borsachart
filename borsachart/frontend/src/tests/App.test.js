import React from 'react';
import { shallow } from 'enzyme';

import App from './../containers/App';

describe('App', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('renders without crashing', () => {
        wrapper;
    });

    it('should have `.container` element', () => {
        expect(
            wrapper.find('.container').exists()
        ).toBe(true);
    });
});
