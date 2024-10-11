import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Modules */
import { darkColors } from '@theme';
import { FormCalendar } from '@ui';

/* Utils */
import { date } from '@utils';

export const renderComponent = () => render(
    <Formik
        initialValues={{ date: new Date('2022-12-29 00:00:00') }}
        onSubmit={ () => {} }
    >
        { () => (
            <FormCalendar
                inputDateFormat="DD"
                label="Fecha:"
                name="date"
                icon={
                    <Ionicons
                        color={ darkColors.icon }
                        name="calendar-outline"
                        size={ 25 }
                        testID="form-calendar-icon"
                    />
                }
            />
        ) }
    </Formik>
);

describe('Test in <FormCalendar /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render props', async () => {
        renderComponent();

        const label = await screen.findByTestId('form-calendar-label');
        const textInput = await screen.findByTestId('form-calendar-text-input');
        const dateValue = date.format(new Date('2022-12-29 00:00:00'), 'DD');

        expect(label).toBeOnTheScreen();
        expect(label).toHaveTextContent('Fecha:');


        expect(textInput).toBeOnTheScreen();
        expect(textInput).toHaveDisplayValue(dateValue);
    });
});