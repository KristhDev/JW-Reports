import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Setup */
import { useRevisitsSpy, useStatusSpy, useUISpy } from '../../../../../jest.setup';

/* Mocks */
import { selectedRevisitStateMock, setSelectedRevisitMock } from '../../../../mocks';

/* Modules */
import { RevisitDetail } from '../../../../../src/modules/revisits';
import { UI_INITIAL_STATE } from '../../../../../src/modules/ui';

/* Utils */
import { date } from '../../../../../src/utils';

const revisitPhoto = 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg';

const renderScreen = () => render(<RevisitDetail />);

describe('Test in <RevisitDetail /> screen', () => {
    useRevisitsSpy.mockImplementation(() => ({
        state: selectedRevisitStateMock,
        completeRevisit: jest.fn(),
        saveRevisit: jest.fn(),
        setSelectedRevisit: setSelectedRevisitMock,
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: jest.fn()
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

    it('should render revisit date', () => {
        renderScreen();
        const selectedRevisit = selectedRevisitStateMock.selectedRevisit;

        /* Get elements with data of revisit */
        const title = screen.getByTestId('title-text');
        const aboutSubtitle = screen.getByTestId('revisit-detail-about-subtitle');
        const aboutText = screen.getByTestId('revisit-detail-about-text');
        const addressText = screen.getByTestId('revisit-detail-address-text');
        const createdDate = screen.getByTestId('revisit-detail-created-date');

        /* Check if title exists and contain respective values */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(selectedRevisit.personName.toUpperCase());

        /* Check if about section exists and contain respective value */
        expect(aboutSubtitle).toBeOnTheScreen();
        expect(aboutSubtitle).toHaveTextContent(`Información de ${ selectedRevisit.personName }:`);
        expect(aboutText).toBeOnTheScreen();
        expect(aboutText).toHaveTextContent(selectedRevisit.about);

        /* Check if address section exists and contain respective value */
        expect(addressText).toBeOnTheScreen();
        expect(addressText).toHaveTextContent(selectedRevisit.address);

        /* Check if date exists and contain respective value */
        expect(createdDate).toBeOnTheScreen();
        expect(createdDate).toHaveTextContent(date.format(selectedRevisit.createdAt, 'DD/MM/YYYY'));
    });

    it('should render next visit when selectedRevisit.done is false', () => {
        renderScreen();
        const nextVisit = date.format(selectedRevisitStateMock.selectedRevisit.nextVisit, 'DD [de] MMMM [del] YYYY');

        /* Get next visit text */
        const nextVisitText = screen.getByTestId('revisit-detail-next-visit');

        /* Check if next visit text exists and contain respective value */
        expect(nextVisitText).toBeOnTheScreen();
        expect(nextVisitText).toHaveTextContent(nextVisit);
    });

    it('should render revisit again section when selectedRevisit.done is true', () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
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
        }) as any);

        renderScreen();

        /* Get again section and check if exists */
        const revisitAgainSection = screen.getByTestId('revisit-detail-revisit-again-section');
        expect(revisitAgainSection).toBeOnTheScreen();
    });

    it('should call image if exisit in revisit', () => {

        /* Mock data of useRevisits */
        useRevisitsSpy.mockImplementation(() => ({
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
        }) as any);

        renderScreen();

        const selectedRevisit = {
            ...selectedRevisitStateMock.selectedRevisit,
            photo: revisitPhoto
        }

        /* Get image and text image */
        const photoImage = screen.getByTestId('revisit-detail-photo-image');
        const photoText = screen.getByTestId('revisit-detail-photo-text');

        /* Check if image photo and image text exists and contain respective value */
        expect(photoImage).toBeOnTheScreen();
        expect(photoImage.props).toHaveProperty('source.uri', revisitPhoto);
        expect(photoText).toBeOnTheScreen();
        expect(photoText).toHaveTextContent(`La foto es para ayudarte a recordar el lugar de residencia de ${ selectedRevisit.personName }`);
    });

    it('should not call setSelectedRevisit when index of navigation is different of 0', () => {
        renderScreen();

        /* Check if setSelectedRevisit isnt called */
        expect(setSelectedRevisitMock).not.toHaveBeenCalled();
    });
});