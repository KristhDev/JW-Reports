import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import { coursesStateMock, revisitsStateMock, setSelectedRevisitMock } from '../../../../mocks';

/* Modules */
import { INIT_REVISIT, Revisits, useRevisits } from '../../../../../src/modules/revisits';
import { useCourses } from '../../../../../src/modules/courses';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

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
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        saveCourse: jest.fn(),
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: revisitsStateMock,
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render add button when route name is RevisitsScreen', () => {
        renderScreen();

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
        const addBtn = fabs[fabs.length - 1];
        const icon = addBtn.props.children[0].props.children[1];

        /* Check if fab exists and contain respective icon */
        expect(addBtn).toBeTruthy();
        expect(icon).toHaveProp('name', 'add-circle-outline');
    });

    it('should call setSelectedRevisit when add button is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const fabs = screen.getAllByTestId('fab-touchable');
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