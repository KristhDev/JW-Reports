import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Mocks */
import { initialUIStateMock, useUISpy } from '@mocks';

/* Modules */
import { darkColors } from '@theme';
import { FormField } from '@ui';

const fieldLabel = 'Nombre:';
const fieldPlaceholder = 'Ingrese su nombre';
const textValue = 'Test name';

const user = userEvent.setup();

const renderComponent = () => render(
    <Formik
        initialValues={{ name: '' }}
        onSubmit={ () => {} }
    >
        { () => (
            <FormField
                autoCapitalize="none"
                leftIcon={
                    <Ionicons
                        color={ darkColors.icon }
                        name="person-outline"
                        size={ 25 }
                        testID="form-field-icon"
                    />
                }
                label={ fieldLabel }
                name="name"
                placeholder={ fieldPlaceholder }
            />
        ) }
    </Formik>
);

describe('Test in <FormField /> component', () => {
    useUISpy.mockImplementation(() => ({ state: initialUIStateMock }) as any);

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        /* Get elements with props of component */
        const label = screen.getByTestId('form-field-label');
        const input = screen.getByTestId('form-field-text-input');
        const icon = screen.getByTestId('form-field-icon');

        /* Check if exists this elemets and has props */
        expect(label).toBeOnTheScreen();
        expect(label).toHaveTextContent(fieldLabel);
        expect(input).toBeOnTheScreen();
        expect(input.props.autoCapitalize).toBe('none');
        expect(input.props.placeholder).toBe(fieldPlaceholder);
        expect(icon).toBeOnTheScreen();
    });

    it('should change value of text input', async () => {
        renderComponent();

        /* Get text input */
        const input = screen.getByTestId('form-field-text-input');
        await user.type(input, textValue);

        /* Check if change value of input */
        expect(input.props.value).toBe(textValue);
    });
});