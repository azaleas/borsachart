import React from 'react';
import { shallow } from 'enzyme';

import ChartComponent from './../components/ChartComponent';

import mockData from './mockData';

const data = mockData.data;

describe('ChartComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ChartComponent data={data} />);
    });

    it('renders without crashing', () => {
        wrapper;
    });

    it('should have `.graph-container` element', () => {
        expect(
            wrapper.find('.graph-container').exists()
        ).toBe(true);
    });
});
