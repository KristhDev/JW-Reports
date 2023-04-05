import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { INIT_REVISIT } from '../../../src/features/revisits';
import { coursesState } from '../../features/courses';
import { revisitsState } from '../../features/revisits';

import { Revisits } from '../../../src/screens/revisits';

import { useCourses, useRevisits, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const setSelectedRevisitMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Revisits /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
        saveCourse: jest.fn(),
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: revisitsState,
        deleteRevisit: jest.fn(),
        loadRevisits: jest.fn(),
        removeRevisits: jest.fn(),
        setRefreshRevisits: jest.fn(),
        setRevisitsPagination: jest.fn(),
        setSelectedRevisit: setSelectedRevisitMock,
        completeRevisit: jest.fn(),
        saveRevisit: jest.fn(),
    });

    (useStatus as jest.Mock).mockReturnValue({
        setStatus: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        render(
            <MenuProvider>
                <Revisits
                    route={{
                        name: 'RevisitsScreen',
                        params: {
                            title: 'TODAS MIS REVISITAS',
                            emptyMessage: 'No haz agregado ninguna revisita.',
                            filter: 'all',
                        },
                        key: 'RevisitsScreen',
                    }}
                    navigation={{
                        addListener: jest.fn(),
                        canGoBack: jest.fn(),
                        dispatch: jest.fn(),
                        getId: jest.fn(),
                        goBack: jest.fn(),
                        isFocused: jest.fn(),
                        navigate: jest.fn(),
                        getParent: jest.fn(),
                        getState: jest.fn(),
                        jumpTo: jest.fn(),
                        removeListener: jest.fn(),
                        reset: jest.fn(),
                        setOptions: jest.fn(),
                        setParams: jest.fn()
                    }}
                />
            </MenuProvider>
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is RevisitsScreen', () => {
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        expect(addBtn).toBeTruthy();
        expect(addBtn.props.children[0].props.name).toBe('add-circle-outline');
    });

    it('should call setSelectedRevisit when add button is pressed', () => {
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];

        fireEvent.press(addBtn);

        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith({
            ...INIT_REVISIT,
            next_visit: expect.any(String)
        });
    });
});