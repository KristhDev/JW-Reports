import React from 'react';
import { Formik } from 'formik';
import { render, screen } from '@testing-library/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Modules */
import { DatetimeField } from '../../../../../src/modules/ui';
import { darkColors } from '../../../../../src/modules/theme';

const renderComponent = () => render(
    <Formik
        initialValues={{ day: new Date('2022-12-29 00:00:00') }}
        onSubmit={ () => {} }
    >
        { () => (
            <DatetimeField
                icon={
                    <Ionicons
                        color={ darkColors.contentHeader }
                        name="calendar-outline"
                        size={ 25 }
                    />
                }
                inputDateFormat="DD"
                label="Día de predicación:"
                modalTitle="Día de predicación"
                mode="date"
                name="day"
                placeholder="Seleccione el día"
            />
        ) }
    </Formik>
);

describe('Test in <DatetimeField /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render label', () => {
        renderComponent();

        /* Get label of field */
        const label = screen.getByTestId('datetimefield-label');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe('Día de predicación:');
    });
});