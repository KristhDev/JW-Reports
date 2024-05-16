import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

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
} from '../../../../mocks';

/* Mock hooks */
import { useCourses } from '../../../../../src/modules/courses';
import { RevisitsList, useRevisits } from '../../../../../src/modules/revisits';
import { useNetwork, useStatus } from '../../../../../src/modules/shared';

const emptyMessageTest = 'No hay revisitas disponibles';
const titleTest = 'Mis Revisitas';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
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
        expect(titleText).toHaveTextContent(titleTest);
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
        expect(emptyMsgText).toHaveTextContent(emptyMessageTest);
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
        expect(loader).toBeOnTheScreen();
    });

    it('should search when searchInput is submit', async () => {
        renderComponent();

        /* Get search input text, type search and submit */
        const searchInput = screen.getByTestId('search-input-text-input');
        await user.type(searchInput, 'Test search', { submitEditing: true });

        /**
         * Check if setRevisitsPagination, removeRevisits and loadRevisits is called
         * one time with respective args
         */
        expect(setRevisitsPaginationMock).toHaveBeenCalledTimes(1);
        expect(setRevisitsPaginationMock).toHaveBeenCalledWith({ from: 0, to: 9 });
        expect(removeRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledTimes(1);
        expect(loadRevisitsMock).toHaveBeenCalledWith({ filter: 'all', search: 'Test search', refresh: true });
    });
});