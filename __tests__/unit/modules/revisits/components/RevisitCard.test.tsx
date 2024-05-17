import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Setup */
import { mockUseNavigation, useRevisitsSpy } from '../../../../../jest.setup';

/* Mocks */
import { onDeleteMock, onPassMock, onRevisitMock, selectedRevisitStateMock, setSelectedRevisitMock } from '../../../../mocks';

/* Modules */
import { Revisit, RevisitCard } from '../../../../../src/modules/revisits';

/* Utils */
import { date } from '../../../../../src/utils';

const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

const user = userEvent.setup();
const renderComponent = (revisit: Revisit) => render(
    <MenuProvider>
        <RevisitCard
            onDelete={ onDeleteMock }
            onPass={ onPassMock }
            onRevisit={ onRevisitMock }
            revisit={ revisit }
            screenToNavigate="RevisitDetailScreen"
        />
    </MenuProvider>
);

describe('Test in <RevisitCard /> component', () => {
    useRevisitsSpy.mockImplementation(() => ({
        setSelectedRevisit: setSelectedRevisitMock
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent(selectedRevisit);
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render data of revisit', () => {
        renderComponent(selectedRevisit);

        const nextVisit = date.format(selectedRevisit.nextVisit, '[Visitar] [el] DD [de] MMMM [del] YYYY');

        /* Get elements with data of revisit */
        const nextVisitText = screen.queryByTestId('revisit-card-next-visit-text');
        const personNameText = screen.queryByTestId('revisit-card-person-name-text');
        const aboutText = screen.queryByTestId('revisit-card-about-text');

        /* Check if elements exists and contain data of revisit */
        expect(nextVisitText).toBeOnTheScreen();
        expect(nextVisitText).toHaveTextContent(nextVisit);
        expect(personNameText).toBeOnTheScreen();
        expect(personNameText).toHaveTextContent(selectedRevisit.personName);
        expect(aboutText).toBeOnTheScreen();
    });

    it('should call setSelectedRevisit and navigate when card is pressed', async () => {
        renderComponent(selectedRevisit);

        /* Get touchable of card */
        const pressable = screen.getByTestId('revisit-card-touchable');
        await user.press(pressable);

        /**
         * Check setSelectedRevisit and navigate are called on time
         * with respective args
         */
        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith(selectedRevisit);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('RevisitDetailScreen');
    });

    it('should render Visita hecha when selectedRevisit.done is true', () => {
        renderComponent({ ...selectedRevisit, done: true });

        /* Get visit text */
        const nextVisitText = screen.getByTestId('revisit-card-next-visit-text');

        /* Check if element exists and contain text "Visita hecha" */
        expect(nextVisitText).toBeOnTheScreen();
        expect(nextVisitText).toHaveTextContent('Visita hecha');
    });
});