import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Setup */
import { useCoursesSpy, useNetworkSpy, useRevisitsSpy, useStatusSpy, useUISpy } from '../../../../../jest.setup';

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

/* Modules */
import { RevisitsList } from '../../../../../src/modules/revisits';
import { UI_INITIAL_STATE } from '../../../../../src/modules/ui';

const emptyMessageTest = 'No hay revisitas disponibles';
const titleTest = 'Mis Revisitas';

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
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        saveCourse: jest.fn(),
    }) as any);

    useRevisitsSpy.mockImplementation(() => ({
        state: revisitsStateMock,
        deleteRevisit: deleteRevisitMock,
        loadRevisits: loadRevisitsMock,
        removeRevisits: removeRevisitsMock,
        setRefreshRevisits: setRefreshRevisitsMock,
        setRevisitsPagination: setRevisitsPaginationMock,
        setSelectedRevisit: setSelectedRevisitMock,
        completeRevisit: completeRevisitMock,
        saveRevisit: saveRevisitMock,
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setStatus: setStatusMock,
    }) as any);

    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

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
        useRevisitsSpy.mockImplementation(() => ({
            state: initialRevisitsStateMock,
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock,
        }) as any);

        renderComponent();

        /* Get empty message of list and check if is text pass for props */
        const emptyMsgText = screen.getByTestId('info-text-text');
        expect(emptyMsgText).toHaveTextContent(emptyMessageTest);
    });

    it('should render loading when isRevisitsLoading is true', () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
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
        }) as any);

        renderComponent();

        /* Get loader and check if exists in component */
        const loader = screen.getByTestId('loader');
        expect(loader).toBeOnTheScreen();
    });

    it('should search when searchInput is submit', async () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
            state: initialRevisitsStateMock,
            deleteRevisit: deleteRevisitMock,
            loadRevisits: loadRevisitsMock,
            removeRevisits: removeRevisitsMock,
            setRefreshRevisits: setRefreshRevisitsMock,
            setRevisitsPagination: setRevisitsPaginationMock,
            setSelectedRevisit: setSelectedRevisitMock,
            completeRevisit: completeRevisitMock,
            saveRevisit: saveRevisitMock,
        }) as any);

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