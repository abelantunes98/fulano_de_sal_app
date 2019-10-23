const mockReturnValues = {
	'USER_CURRENTY': {
		nome: "Rick",
		email: "richelton14@gmail.com"
	},
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

jest.mock("NativeModules", () => ({
	UIManager: {
	  RCTView: () => ({
		directEventTypes: {}
	  })
	},
	KeyboardObserver: {},
	RNGestureHandlerModule: {
	  attachGestureHandler: jest.fn(),
	  createGestureHandler: jest.fn(),
	  dropGestureHandler: jest.fn(),
	  updateGestureHandler: jest.fn(),
	  State: {},
	  Directions: {}
	}
}))

import React from 'react';
jest.unmock("../src/services/banco");

import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import PerfilAdmin from "../src/pages/private/admin/PerfilAdmin";
import { Modal } from 'react-native';


describe('PerfilAdmin', () => {
	let tree;
	const setState = jest.fn();
	const useStateSpy = jest.spyOn(React, 'useState')
	useStateSpy.mockImplementation((init) => [init, setState]);
	
	beforeEach(() => {
		tree = Enzyme.shallow(<PerfilAdmin />);
	});
	
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('Snapshot', async () => {
		expect(tree).toMatchSnapshot();
	});

	it("Styles da View", async () => {
		expect(tree.prop('style')).toEqual({
			flexGrow : 1, 
			justifyContent : 'center',
			backgroundColor: '#ffffff',
		});
	});

	it("Existência de apenas um modal", async () => {
		expect(tree.find(Modal)).toHaveLength(1);
	});

	it("Styles Modal", async () => {
		expect(tree.find(Modal).prop('style')).toEqual({
			"height": "100%",
			"justifyContent": "center",
			"width": "97%",
		});
	});
});