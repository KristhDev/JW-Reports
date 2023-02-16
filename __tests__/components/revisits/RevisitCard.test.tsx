import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import dayjs from 'dayjs';

import { selectedRevisitState } from '../../features/revisits';

import { useRevisits, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { RevisitCard } from '../../../src/components/revisits';

import { navigateMock } from '../../../jest.setup';

const setSelectedRevisitMock = jest.fn();
const onDeleteMock = jest.fn();
const onPassMock = jest.fn();
const onRevisitMock = jest.fn();

const selectedRevisit = selectedRevisitState.selectedRevisit;

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
        render(
            <MenuProvider>
                <RevisitCard
                    onDelete={ onDeleteMock }
                    onPass={ onPassMock }
                    onRevisit={ onRevisitMock }
                    revisit={ selectedRevisit }
                />
            </MenuProvider>
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render data of revisit', () => {
        const nextVisit = dayjs(selectedRevisit.next_visit);
        const visit = `Visitar el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`;

        const nextVisitText = screen.getByTestId('revisit-card-next-visit-text');
        const personNameText = screen.getByTestId('revisit-card-person-name-text');
        const aboutText = screen.getByTestId('revisit-card-about-text');

        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe(visit);
        expect(personNameText).toBeTruthy();
        expect(personNameText.props.children).toBe(selectedRevisit.person_name);
        expect(aboutText).toBeTruthy();
    });

    it('should call setSelectedRevisit and navigate when card is pressed', () => {
        const touchable = screen.getByTestId('revisit-card-touchable');
        fireEvent.press(touchable);

        expect(setSelectedRevisitMock).toHaveBeenCalledTimes(1);
        expect(setSelectedRevisitMock).toHaveBeenCalledWith(selectedRevisit);
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('RevisitDetailScreen');
    });

    it('should render Visita hecha whenn selectedRevisit.done is true', () => {
        render(
            <MenuProvider>
                <RevisitCard
                    onDelete={ onDeleteMock }
                    onPass={ onPassMock }
                    onRevisit={ onRevisitMock }
                    revisit={{ ...selectedRevisit, done: true }}
                />
            </MenuProvider>
        );

        const nextVisitText = screen.getByTestId('revisit-card-next-visit-text');

        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe('Visita hecha');
    });
});