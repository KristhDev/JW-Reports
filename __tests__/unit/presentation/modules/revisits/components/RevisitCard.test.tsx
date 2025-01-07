import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Mocks */
import {
    navigateToDetailMock,
    navigateToEditMock,
    onDeleteMock,
    onPassMock,
    onRevisitMock,
    selectedRevisitStateMock,
    setSelectedRevisitMock,
    useRevisitsSpy
} from '@mocks';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { RevisitCard } from '@revisits';

const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

const user = userEvent.setup();
const renderComponent = (revisit: RevisitEntity) => render(
    <MenuProvider>
        <RevisitCard
            navigateToDetail={ navigateToDetailMock }
            navigateToEdit={ navigateToEditMock }
            onDelete={ onDeleteMock }
            onPass={ onPassMock }
            onRevisit={ onRevisitMock }
            revisit={ revisit }
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

        const nextVisit = Time.format(selectedRevisit.nextVisit, '[Visitar] [el] DD [de] MMMM [del] YYYY');

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

        /* Get pressable of card */
        const pressable = screen.getByTestId('revisit-card-pressable');
        await user.press(pressable);

        /**
         * Check setSelectedRevisit and navigate are called on time
         * with respective args
         */
        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith(selectedRevisit);
        expect(navigateToDetailMock).toHaveBeenCalledTimes(1);
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