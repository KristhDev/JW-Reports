import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import {
    coursesStateMock,
    initialUIStateMock,
    revisitsStateMock,
    setSelectedRevisitMock,
    useCoursesSpy,
    useRevisitsSpy,
    useStatusSpy,
    useUISpy
} from '@mocks';

/* Features */
import { INIT_REVISIT } from '@application/features';

/* Modules */
import { Revisits } from '@revisits';

const user = userEvent.setup();
const renderScreen = () => render(
    <MenuProvider>
        <Revisits
            emptyMessage="No has agregado ninguna revisita."
            filter="all"
            segment="index"
            title="TODAS MIS REVISITAS"
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
        completeRevisit: jest.fn(),
        deleteRevisit: jest.fn(),
        loadRevisits: jest.fn(),
        removeRevisits: jest.fn(),
        saveRevisit: jest.fn(),
        setRefreshRevisits: jest.fn(),
        setRevisitsPagination: jest.fn(),
        setRevisitsScreenHistory: jest.fn(),
        setSelectedRevisit: setSelectedRevisitMock,
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setStatus: jest.fn(),
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: initialUIStateMock
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