import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { Title } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const titleText = 'Title test';

/* Mock hooks */
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Title /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<Title text={ titleText } />);
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {

        /* Get text of title */
        const title = screen.getByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(titleText);
    });
});