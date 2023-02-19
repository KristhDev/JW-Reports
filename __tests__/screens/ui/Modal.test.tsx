import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Modal } from '../../../src/screens/ui';

describe('Test in <Modal /> screen', () => {
    beforeEach(() => {
        render(
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
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render children', () => {
        const children = screen.getByTestId('modal-content');
        expect(children).toBeTruthy();
    });
});