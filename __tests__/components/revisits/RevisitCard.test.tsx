import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';

/* Components */
import { RevisitCard } from '../../../src/components/revisits';

/* Hooks */
import { useRevisits, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { onDeleteMock, onPassMock, onRevisitMock, selectedRevisitStateMock, setSelectedRevisitMock } from '../../mocks';

const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

const renderComponent = () => render(
    <MenuProvider>
        <RevisitCard
            onDelete={ onDeleteMock }
            onPass={ onPassMock }
            onRevisit={ onRevisitMock }
            revisit={ selectedRevisit }
            screenToNavigate="RevisitDetailScreen"
        />
    </MenuProvider>
);

/* Mock hooks */
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevisitCard /> component', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        setSelectedRevisit: setSelectedRevisitMock
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

    it('should render data of revisit', () => {
        renderComponent();

        const nextVisit = dayjs(selectedRevisit.nextVisit);
        const visit = `Visitar el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`;

        /* Get elements with data of revisit */
        const nextVisitText = screen.queryByTestId('revisit-card-next-visit-text');
        const personNameText = screen.queryByTestId('revisit-card-person-name-text');
        const aboutText = screen.queryByTestId('revisit-card-about-text');

        /* Check if elements exists and contain data of revisit */
        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText!.props.children).toBe(visit);
        expect(personNameText).toBeTruthy();
        expect(personNameText!.props.children).toBe(selectedRevisit.personName);
        expect(aboutText).toBeTruthy();
    });

    it('should call setSelectedRevisit and navigate when card is pressed', () => {
        renderComponent();

        /* Get touchable of card */
        const touchable = screen.getByTestId('revisit-card-touchable');
        fireEvent.press(touchable);

        /**
         * Check setSelectedRevisit and navigate are called on time
         * with respective args
         */
        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith(selectedRevisit);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('RevisitDetailScreen');
    });

    it('should render Visita hecha when selectedRevisit.done is true', () => {
        render(
            <MenuProvider>
                <RevisitCard
                    onDelete={ onDeleteMock }
                    onPass={ onPassMock }
                    onRevisit={ onRevisitMock }
                    revisit={{ ...selectedRevisit, done: true }}
                    screenToNavigate="RevisitDetailScreen"
                />
            </MenuProvider>
        );

        /* Get visit text */
        const nextVisitText = screen.getByTestId('revisit-card-next-visit-text');

        /* Check if element exists and contain text "Visita hecha" */
        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe('Visita hecha');
    });
});