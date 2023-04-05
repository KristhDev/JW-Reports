import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { RevisitsList } from '../../../src/components/revisits';

import { coursesState } from '../../features/courses';
import { initialState as initRevisitsState, revisitsState } from '../../features/revisits';

import { useCourses, useRevisits, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const deleteRevisitMock = jest.fn();
const loadRevisitsMock = jest.fn();
const removeRevisitsMock = jest.fn();
const setRefreshRevisitsMock = jest.fn();
const setRevisitsPaginationMock = jest.fn();
const setSelectedRevisitMock = jest.fn();

const emptyMessageTest = 'No hay revisitas disponibles';
const titleTest = 'Mis Revisitas';

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <Revisits /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
        saveCourse: jest.fn(),
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: revisitsState,
        deleteRevisit: deleteRevisitMock,
        loadRevisits: loadRevisitsMock,
        removeRevisits: removeRevisitsMock,
        setRefreshRevisits: setRefreshRevisitsMock,
        setRevisitsPagination: setRevisitsPaginationMock,
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
                <RevisitsList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
            </MenuProvider>
        );

        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        const { getByTestId } = render(
            <MenuProvider>
                <RevisitsList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
            </MenuProvider>
        );

        const titleText = getByTestId('title-text');
        expect(titleText.props.children).toBe(titleTest);
    });

    it('should render message when revisits is empty', () => {
        (useRevisits as jest.Mock).mockReturnValue({
            state: initRevisitsState,
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <RevisitsList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
            </MenuProvider>
        );

        const emptyMsgText = getByTestId('info-text-text');
        expect(emptyMsgText.props.children).toBe(emptyMessageTest);
    });

    it('should render loading when isCoursesLoading is true', () => {
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...initRevisitsState,
                isRevisitsLoading: true
            },
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
        });

        const { getByTestId } = render(
            <MenuProvider>
                <RevisitsList
                    emptyMessage={ emptyMessageTest }
                    filter="all"
                    title={ titleTest }
                />
            </MenuProvider>
        );

        const loader = getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should search when searchInput is submit', () => {
        const searchInput = screen.getByTestId('search-input-text-input');
        fireEvent(searchInput, 'onChangeText', 'Test search');
        fireEvent(searchInput, 'onSubmitEditing');

        expect(setRevisitsPaginationMock).toHaveBeenCalledTimes(1);
        expect(setRevisitsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledWith({
            filter: 'all', search: 'Test search', refresh: true
        });
    });
});