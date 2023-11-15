import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Components */
import { RevisitsList } from '../../../src/components/revisits';

/* Hooks */
import { useCourses, useNetwork, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import {
    completeRevisitMock,
    coursesStateMock,
    deleteRevisitMock,
    initialRevisitsStateMock,
    loadRevisitsMock,
    removeRevisitsMock,
    revisitsStateMock,
    saveRevisitMock,
    setRefreshRevisitsMock,
    setRevisitsPaginationMock,
    setSelectedRevisitMock,
    setStatusMock,
    wifiMock
} from '../../mocks';

const emptyMessageTest = 'No hay revisitas disponibles';
const titleTest = 'Mis Revisitas';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

const renderComponent = () => render(
    <MenuProvider>
        <RevisitsList
            emptyMessage={ emptyMessageTest }
            filter="all"
            title={ titleTest }
        />
    </MenuProvider>
);

describe('Test in <RevisitsList /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        saveCourse: jest.fn(),
    });

    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: revisitsStateMock,
        deleteRevisit: deleteRevisitMock,
        loadRevisits: loadRevisitsMock,
        removeRevisits: removeRevisitsMock,
        setRefreshRevisits: setRefreshRevisitsMock,
        setRevisitsPagination: setRevisitsPaginationMock,
        setSelectedRevisit: setSelectedRevisitMock,
        completeRevisit: completeRevisitMock,
        saveRevisit: saveRevisitMock,
    });

    (useStatus as jest.Mock).mockReturnValue({
        setStatus: setStatusMock,
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get title of list and check if is text pass for props */
        const titleText = screen.getByTestId('title-text');
        expect(titleText.props.children).toBe(titleTest);
    });

    it('should render message when revisits is empty', () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: initialRevisitsStateMock,
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock,
        });

        renderComponent();

        /* Get empty message of list and check if is text pass for props */
        const emptyMsgText = screen.getByTestId('info-text-text');
        expect(emptyMsgText.props.children).toBe(emptyMessageTest);
    });

    it('should render loading when isCoursesLoading is true', () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...initialRevisitsStateMock,
                isRevisitsLoading: true
            },
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock,
        });

        renderComponent();

        /* Get loader and check if exists in component */
        const loader = screen.getByTestId('loader');
        expect(loader).toBeTruthy();
    });

    it('should search when searchInput is submit', () => {
        renderComponent();

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        fireEvent(searchInput, 'onChangeText', 'Test search');
        fireEvent(searchInput, 'onSubmitEditing');

        /**
         * Check if setRevisitsPagination, removeRevisits and loadRevisits is called
         * one time with respective args
         */
        expect(setRevisitsPaginationMock).toHaveBeenCalledTimes(1);
        expect(setRevisitsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledWith({
            filter: 'all', search: 'Test search', refresh: true
        });
    });
});