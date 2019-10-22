const mockReturnValues = {
	arrayOne: JSON.stringify(['red', 'blue']),
	objectOne: JSON.stringify({
		isATest: true,
		hasNestedData: {
			ohYeah: 'it\'s true',
		}
	}),
	stringOne: JSON.stringify('testing string'),
};

function mockMultiGetTestData() {
	return [
		['key1', JSON.stringify({ valor: 1 })],
		['key2', JSON.stringify({ valor: 2 })],
	];
}

function mockMultiSaveTestData() {
	return [
		['key1', { valor: 1 }],
		['key2', { valor: 2 }],
	];
}

import AsyncStorage from '@react-native-community/async-storage';
jest.mock('@react-native-community/async-storage', () => ({
	setItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	multiSet:  jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	getItem: jest.fn((key) => {
		return new Promise((resolve) => {
			if (mockReturnValues[key]) {
				resolve(mockReturnValues[key]);
			} else {
				resolve(null);
			}
		});
	}),
	multiGet: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(mockMultiGetTestData());
		});
	}),
	removeItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null);
		});
	}),
	getAllKeys: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(['one', 'two', 'three']);
		});
	}),
	multiRemove: jest.fn(() => ({
		then: jest.fn(),
	})),
}));

import React from 'react';
jest.unmock("../src/services/banco");

import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import PerfilAdmin from "../src/pages/private/admin/PerfilAdmin";

describe('PerfilAdmin', () => {
    it('Snapshot', async () => {
        const tree = shallow(<PerfilAdmin />);
        expect(tree).toMatchSnapshot();
    });
});