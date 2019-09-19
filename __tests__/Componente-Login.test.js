import React from 'react';
import Login from "../src/pages/public/Login";

import renderer from 'react-test-renderer';

it('Testando Criação do Componente Login', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});