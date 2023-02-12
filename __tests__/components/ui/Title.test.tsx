import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Title } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const titleText = 'Title test';

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
        const title = screen.getByTestId('title-text');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(titleText);
    });
});