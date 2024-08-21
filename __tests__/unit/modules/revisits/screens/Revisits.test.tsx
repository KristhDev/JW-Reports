import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Setup */
import { useCoursesSpy, useRevisitsSpy, useStatusSpy, useUISpy } from '../../../../../jest.setup';

/* Mocks */
import { coursesStateMock, revisitsStateMock, setSelectedRevisitMock } from '../../../../mocks';

/* Modules */
import { INIT_REVISIT, Revisits } from '../../../../../src/modules/revisits';
import { UI_INITIAL_STATE } from '../../../../../src/modules/ui';

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <Revisits
            route={{
                name: 'RevisitsScreen',
                params: {
                    title: 'TODAS MIS REVISITAS',
                    emptyMessage: 'No has agregado ninguna revisita.',
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

describe('Test in <Revisits /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        saveCourse: jest.fn(),
    }) as any);

    useRevisitsSpy.mockImplementation(() => ({
        state: revisitsStateMock,
        deleteRevisit: jest.fn(),
        loadRevisits: jest.fn(),
        removeRevisits: jest.fn(),
        setRefreshRevisits: jest.fn(),
        setRevisitsPagination: jest.fn(),
        setSelectedRevisit: setSelectedRevisitMock,
        completeRevisit: jest.fn(),
        saveRevisit: jest.fn(),
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setStatus: jest.fn(),
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is RevisitsScreen', async () => {
        renderScreen();

        /* Get pressable */
        const fabs = screen.getAllByTestId('fab-pressable');
        const addBtn = fabs[fabs.length - 1];
        const icon = await addBtn.findByProps({ name: 'add-circle-outline' });

        /* Check if fab exists and contain respective icon */
        expect(addBtn).toBeTruthy();
        expect(icon.props).toHaveProperty('name', 'add-circle-outline');
    });

    it('should call setSelectedRevisit when add button is pressed', async () => {
        renderScreen();

        /* Get pressable */
        const fabs = screen.getAllByTestId('fab-pressable');
        const addBtn = fabs[fabs.length - 1];

        await user.press(addBtn);

        /* Check if setSelectedRevisit is called one time with respective value */
        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith({
            ...INIT_REVISIT,
            nextVisit: expect.any(String)
        });
    });
});