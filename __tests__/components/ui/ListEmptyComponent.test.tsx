import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ListEmptyComponent } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts');

const emptyMessage = 'Empty message test';

describe('Test in <ListEmptyComponent /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(
            <ListEmptyComponent
                msg={ emptyMessage }
                showMsg
            />
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render message', () => {
        const msg = screen.getByTestId('info-text-text');
        expect(msg.props.children).toBe(emptyMessage);
    });

    it('should not render message', async () => {
        render(
            <ListEmptyComponent
                msg={ emptyMessage }
                showMsg={ false }
            />
        );

        expect(screen.toJSON()).toBeNull();
    });
});