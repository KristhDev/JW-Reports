import React from 'react';
import { render, screen } from '@testing-library/react-native';

/* Mocks */
import { selectedRevisitStateMock, setSelectedRevisitMock } from '../../../../mocks';

/* Modules */
import { RevisitDetail, useRevisits } from '../../../../../src/modules/revisits';
import { useStatus } from '../../../../../src/modules/shared';

/* Utils */
import { date } from '../../../../../src/utils';

const revisitPhoto = 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg';

/* Mock hooks */
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

const renderScreen = () => render(<RevisitDetail />);

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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderScreen();
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
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(selectedRevisit.personName.toUpperCase());

        /* Check if about section exists and contain respective value */
        expect(aboutSection).toBeOnTheScreen();
        expect(aboutSection.props.children[0]).toHaveTextContent(`Información de ${ selectedRevisit.personName }:`);
        expect(aboutSection.props.children[1]).toHaveTextContent(selectedRevisit.about);

        /* Check if address section exists and contain respective value */
        expect(addressSection).toBeOnTheScreen();
        expect(addressSection.props.children[0]).toHaveTextContent('Dirección:');
        expect(addressSection.props.children[1]).toHaveTextContent(selectedRevisit.address);

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

        renderScreen();

        /* Get again section and check if exists */
        const revisitAgainSection = screen.getByTestId('revisit-detail-revisit-again-section');
        expect(revisitAgainSection).toBeOnTheScreen();
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
        expect(photoText.props.children.join('')).toBe(`La foto es para ayudarte a recordar el lugar de residencia de ${ selectedRevisit.personName }`);
    });

    it('should not call setSelectedRevisit when index of navigation is different of 0', () => {
        renderScreen();

        /* Check if setSelectedRevisit isnt called */
        expect(setSelectedRevisitMock).not.toHaveBeenCalled();
    });
});