import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Modules */
import { darkColors, fontSizes } from '@theme';
import { FormTime } from '@ui';

/* Utils */
import { date } from '@utils';

const renderComponent = () => render(
    <Formik
        initialValues={{ time: new Date('2022-12-29 00:00:00') }}
        onSubmit={ () => {} }
    >
        { () => (
            <FormTime
                editable={ true }
                icon={
                    <Ionicons
                        color={ darkColors.contentHeader }
                        name="time-outline"
                        size={ fontSizes.icon }
                    />
                }
                name="time"
                inputDateFormat="HH:mm"
                label="Hora:"
            />
        ) }
    </Formik>
);

const user = userEvent.setup();

describe('Test in <FormTime /> component', () => {
    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', async () => {
        renderComponent();

        const label = await screen.findByTestId('form-time-label');
        const textInput = await screen.findByTestId('form-time-text-input');
        const timeValue = date.format(new Date('2022-12-29 00:00:00'), 'HH:mm');

        expect(label).toBeOnTheScreen();
        expect(label).toHaveTextContent('Hora:');

        expect(textInput).toBeOnTheScreen();
        expect(textInput).toHaveDisplayValue(timeValue);
    });

    it('should change value of time', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        const hourTextInput = await screen.findByTestId('form-time-text-input-hour');
        const minutesTextInput = await screen.findByTestId('form-time-text-input-minutes');

        await user.clear(hourTextInput);
        await user.clear(minutesTextInput);

        await user.type(hourTextInput, '10');
        await user.type(minutesTextInput, '30');

        expect(hourTextInput).toHaveDisplayValue('10');
        expect(minutesTextInput).toHaveDisplayValue('30');
    });

    it('should change value of time with buttons', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        const pressables = await screen.findAllByTestId('button-pressable');

        await user.press(pressables[1]);
        await user.press(pressables[1]);

        await user.press(pressables[3]);
        await user.press(pressables[3]);

        const hourTextInput = await screen.findByTestId('form-time-text-input-hour');
        const minutesTextInput = await screen.findByTestId('form-time-text-input-minutes');

        expect(hourTextInput).toHaveDisplayValue('22');
        expect(minutesTextInput).toHaveDisplayValue('58');
    });

    it('should not accept values in hour greater than 23', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        const hourTextInput = await screen.findByTestId('form-time-text-input-hour');

        await user.clear(hourTextInput);
        await user.type(hourTextInput, '37');

        expect(hourTextInput).toHaveDisplayValue('00');
    });

    it('should not accept values in minutes greater than 59', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        const minutesTextInput = await screen.findByTestId('form-time-text-input-minutes');

        await user.clear(minutesTextInput);
        await user.type(minutesTextInput, '90');

        expect(minutesTextInput).toHaveDisplayValue('00');
    });

    it('should not accept values greater than 2 digits', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        const hourTextInput = await screen.findByTestId('form-time-text-input-hour');
        const minutesTextInput = await screen.findByTestId('form-time-text-input-minutes');

        await user.clear(hourTextInput);
        await user.clear(minutesTextInput);

        await user.type(hourTextInput, '123');
        await user.type(minutesTextInput, '123');

        expect(hourTextInput).toHaveDisplayValue('12');
        expect(minutesTextInput).toHaveDisplayValue('12');
    });
});