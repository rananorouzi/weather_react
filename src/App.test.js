import { render, screen ,fireEvent } from '@testing-library/react';
import {waitFor} from "@testing-library/dom"
import userEvent from '@testing-library/user-event'

import React from "react";
import Weather from './App';

describe('Test wrong callback params on httpGetAsync', () => {
    let weather = new Weather();
    it('Wrong callback format', () => {
        let result = weather.httpGetAsync('https://api.open-meteo.com/v1/forecast', {}, '');
        expect(result).toBe(false);
    });
    it('Wrong param object format', () => {
        let result = weather.httpGetAsync('https://api.open-meteo.com/v1/forecast',  undefined, function(){});
        expect(result).toBe(false);
    });
    it('Wrong URL Format', () => {
        let result = weather.httpGetAsync(123, '', function(){});
        expect(result).toBe(false);
    });
    it('All valid format', () => {
        let result = weather.httpGetAsync('https://api.open-meteo.com/v1/forecast', {}, function(){});
        expect(result).toBe(true);
    });
});


describe('Test params on formatParams', () => {
    let weather = new Weather();
    it('invalid param', () => {
        let result = weather.formatParams('param=val');
        expect(result).toBe('');
    });
    it('valid param contain one key', () => {
        let result = weather.formatParams({key:'val'});
        expect(result).toBe('?key=val');
    });

    it('vali param contain two key', () => {
        let result = weather.formatParams({key:'val', key2:'val2'});
        expect(result).toBe('?key=val&key2=val2');
    });
});

describe('Test params on formatDateToMonthDay', () => {
    let weather = new Weather();

    it('empty param', () => {
        let result = weather.formatDateToMonthDay('');
        expect(result).toBe('');
    });

    it('valid parameter', () => {
        let result = weather.formatDateToMonthDay(13980506134521);
        expect(result).toBe('9 January - 11:00');
    });

    it('invalid parameter', () => {
        let result = weather.formatDateToMonthDay({date:1481255});
        expect(result).toBe('');
    });
});
