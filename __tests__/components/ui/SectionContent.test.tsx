import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { SectionContent } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts');

const contentTitle = 'Title test';

describe('Test in <SectionContent /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<SectionContent title={ contentTitle } />);
    });

    it('should to match the snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render title', () => {
        const title = screen.getByTestId('info-text-text');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(contentTitle);
    });
});