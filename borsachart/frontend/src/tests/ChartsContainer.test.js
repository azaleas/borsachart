import React from 'react';
import { shallow } from 'enzyme';

import ChartsContainer from './../containers/ChartsContainer';

import api from './../utils/api';

jest.mock('./../utils/api', () => ({
    searchTicker: jest.fn(() => Promise.resolve(200)),
}));

describe('ChartsContainer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ChartsContainer />);
    });

    it('renders without crashing', () => {
        wrapper;
    });

    it('should have `ChartComponent` component', () => {
        expect(
            wrapper.find('ChartComponent').exists()
        ).toBe(true);
    });

    it('should have `InputComponent` component', () => {
        expect(
            wrapper.find('InputComponent').exists()
        ).toBe(true);
    });

    it('should update state on onInputChange', () => {
        wrapper.setState({
            input: "alan",
            inputError: true,
            notFound: true,
        });
        let event = {
            target: {
                value: "alana"
            }
        }
        wrapper.instance().onInputChange(event);
        expect(
            wrapper.state().input
        ).toBe(event.target.value);
        expect(
            wrapper.state().inputError
        ).toBe(false);
        expect(
            wrapper.state().notFound
        ).toBe(false);
    });

    it('should return response from api on onInputSubmit', () => {
        wrapper.instance().onInputSubmit();
        return api.searchTicker()
                .then((response) => {
                    expect(response).toEqual(200);
                })
    });

    it('should return response from api on handleKeyDown', () => {
        wrapper.instance().handleKeyDown({event: {key: "Enter"}});
        return api.searchTicker()
                .then((response) => {
                    expect(response).toEqual(200);
                })
    });

    it('should set `inputError` to true if input is empty', () => {
        wrapper.setState({
            input: ""
        });
        wrapper.instance().onInputSubmit();
        expect(
            wrapper.state().inputError
        ).toBe(true);
    });
});
