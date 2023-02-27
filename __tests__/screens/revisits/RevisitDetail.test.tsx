import React from 'react';
import { render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { RevisitDetail } from '../../../src/screens/revisits';

import { selectedRevisitState } from '../../features/revisits';

import { useRevisits, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const setSelectedRevisitMock = jest.fn();
const revisitPhoto = 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg';

jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevistDetail /> screen', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitState,
        completeRevisit: jest.fn(),
        saveRevisit: jest.fn(),
        setSelectedRevisit: setSelectedRevisitMock,
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    beforeEach(() => {
        render(<RevisitDetail />);
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render revisit date', () => {
        const selectedRevisit = selectedRevisitState.selectedRevisit;

        const title = screen.getByTestId('title-text');
        const aboutSection = screen.getByTestId('revisit-detail-about-section');
        const addressSection = screen.getByTestId('revisit-detail-address-section');
        const createdDate = screen.getByTestId('revisit-detail-created-date');

        expect(title).toBeTruthy();
        expect(title.props.children).toBe(selectedRevisit.person_name.toUpperCase());

        expect(aboutSection).toBeTruthy();
        expect(aboutSection.props.children[0].props.children.join('')).toBe(`Información de ${ selectedRevisit.person_name }:`);
        expect(aboutSection.props.children[1].props.children).toBe(selectedRevisit.about);

        expect(addressSection).toBeTruthy();
        expect(addressSection.props.children[0].props.children).toBe('Dirección:');
        expect(addressSection.props.children[1].props.children).toBe(selectedRevisit.address);

        expect(createdDate).toBeTruthy();
        expect(createdDate.props.children).toBe(dayjs(selectedRevisit.created_at).format('DD/MM/YYYY'));
    });

    it('should render next visit when selectedRevisit.done is false', () => {
        const nextVisit = dayjs(selectedRevisitState.selectedRevisit.next_visit);
        const nextVisitText = screen.getByTestId('revisit-detail-next-visit');

        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe(` ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`);
    });

    it('should render revisit again section when selectedRevisit.done is true', () => {
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitState,
                selectedRevisit: {
                    ...selectedRevisitState.selectedRevisit,
                    done: true
                }
            },
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
            setSelectedRevisit: setSelectedRevisitMock,
        });

        render(<RevisitDetail />);

        const revisitAgainSection = screen.getByTestId('revisit-detail-revisit-again-section');

        expect(revisitAgainSection).toBeTruthy();
    });

    it('should call image if exisit in revisit', () => {
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitState,
                selectedRevisit: {
                    ...selectedRevisitState.selectedRevisit,
                    photo: revisitPhoto
                }
            },
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
            setSelectedRevisit: setSelectedRevisitMock,
        });

        render(<RevisitDetail />);

        const selectedRevisit = {
            ...selectedRevisitState.selectedRevisit,
            photo: revisitPhoto
        }

        const photoImage = screen.getByTestId('revisit-detail-photo-image');
        const photoText = screen.getByTestId('revisit-detail-photo-text');

        expect(photoImage).toBeTruthy();
        expect(photoImage.props.source.uri).toBe(revisitPhoto);
        expect(photoText).toBeTruthy();
        expect(photoText.props.children.join('')).toBe(`La foto es para ayudarte a recordar el lugar de residencia de ${ selectedRevisit.person_name }`);
    });

    it('should not call setSelectedRevisit when index of navigation is different of 0', () => {
        expect(setSelectedRevisitMock).not.toHaveBeenCalled();
    });
});