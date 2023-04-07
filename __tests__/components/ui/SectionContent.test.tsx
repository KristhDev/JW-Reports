import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Components */
import { SectionContent } from '../../../src/components/ui';

/* Hooks */
import { useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
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

        /* Get text of title */
        const title = screen.getByTestId('info-text-text');

        /* Check if title exists and contain respective value */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(contentTitle);
    });
});