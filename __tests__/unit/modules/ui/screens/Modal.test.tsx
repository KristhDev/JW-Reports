import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

/* Screens */
import { Modal } from '../../../../../src/modules/ui';

const renderScreen = () => render(
    <Modal isOpen>
        <View
            style={{
                backgroundColor: '#FFF',
                height: 200,
                width: 300
            }}
            testID="modal-content"
        />
    </Modal>
);

describe('Test in <Modal /> screen', () => {
    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render children', () => {
        renderScreen();

        /* Get child and check if exists */
        const children = screen.getByTestId('modal-content');
        expect(children).toBeTruthy();
    });
});