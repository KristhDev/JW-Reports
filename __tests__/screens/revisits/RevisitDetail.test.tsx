import React from 'react';
import { render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';

/* Screens */
import { RevisitDetail } from '../../../src/screens/revisits';

/* Hooks */
import { useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { selectedRevisitStateMock, setSelectedRevisitMock } from '../../mocks';

const revisitPhoto = 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg';

/* Mock hooks */
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RevisitDetail /> screen', () => {
    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitStateMock,
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
        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        /* Get elements with data of revisit */
        const title = screen.getByTestId('title-text');
        const aboutSection = screen.getByTestId('revisit-detail-about-section');
        const addressSection = screen.getByTestId('revisit-detail-address-section');
        const createdDate = screen.getByTestId('revisit-detail-created-date');

        /* Check if title exists and contain respective values */
        expect(title).toBeTruthy();
        expect(title.props.children).toBe(selectedRevisit.personName.toUpperCase());

        /* Check if about section exists and contain respective value */
        expect(aboutSection).toBeTruthy();
        expect(aboutSection.props.children[0].props.children.join('')).toBe(`Información de ${ selectedRevisit.personName }:`);
        expect(aboutSection.props.children[1].props.children).toBe(selectedRevisit.about);

        /* Check if address section exists and contain respective value */
        expect(addressSection).toBeTruthy();
        expect(addressSection.props.children[0].props.children).toBe('Dirección:');
        expect(addressSection.props.children[1].props.children).toBe(selectedRevisit.address);

        /* Check if date exists and contain respective value */
        expect(createdDate).toBeTruthy();
        expect(createdDate.props.children).toBe(dayjs(selectedRevisit.createdAt).format('DD/MM/YYYY'));
    });

    it('should render next visit when selectedRevisit.done is false', () => {
        const nextVisit = dayjs(selectedRevisitStateMock.selectedRevisit.nextVisit);

        /* Get next visit text */
        const nextVisitText = screen.getByTestId('revisit-detail-next-visit');

        /* Check if next visit text exists and contain respective value */
        expect(nextVisitText).toBeTruthy();
        expect(nextVisitText.props.children).toBe(` ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`);
    });

    it('should render revisit again section when selectedRevisit.done is true', () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitStateMock,
                selectedRevisit: {
                    ...selectedRevisitStateMock.selectedRevisit,
                    done: true
                }
            },
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
            setSelectedRevisit: setSelectedRevisitMock,
        });

        render(<RevisitDetail />);

        /* Get again section and check if exists */
        const revisitAgainSection = screen.getByTestId('revisit-detail-revisit-again-section');
        expect(revisitAgainSection).toBeTruthy();
    });

    it('should call image if exisit in revisit', () => {

        /* Mock data of useRevisits */
        (useRevisits as jest.Mock).mockReturnValue({
            state: {
                ...selectedRevisitStateMock,
                selectedRevisit: {
                    ...selectedRevisitStateMock.selectedRevisit,
                    photo: revisitPhoto
                }
            },
            completeRevisit: jest.fn(),
            saveRevisit: jest.fn(),
            setSelectedRevisit: setSelectedRevisitMock,
        });

        render(<RevisitDetail />);

        const selectedRevisit = {
            ...selectedRevisitStateMock.selectedRevisit,
            photo: revisitPhoto
        }

        /* Get image and text image */
        const photoImage = screen.getByTestId('revisit-detail-photo-image');
        const photoText = screen.getByTestId('revisit-detail-photo-text');

        /* Check if image photo and image text exists and contain respective value */
        expect(photoImage).toBeTruthy();
        expect(photoImage.props.source.uri).toBe(revisitPhoto);
        expect(photoText).toBeTruthy();
        expect(photoText.props.children.join('')).toBe(`La foto es para ayudarte a recordar el lugar de residencia de ${ selectedRevisit.personName }`);
    });

    it('should not call setSelectedRevisit when index of navigation is different of 0', () => {

        /* Check if setSelectedRevisit isnt called */
        expect(setSelectedRevisitMock).not.toHaveBeenCalled();
    });
});