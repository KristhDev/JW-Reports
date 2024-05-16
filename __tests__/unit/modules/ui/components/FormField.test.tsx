import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Modules */
import { FormField } from '../../../../../src/modules/ui';
import { darkColors } from '../../../../../src/modules/theme';

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
                icon={
                    <Icon
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
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(fieldLabel);
        expect(input).toBeTruthy();
        expect(input.props.autoCapitalize).toBe('none');
        expect(input.props.placeholder).toBe(fieldPlaceholder);
        expect(icon).toBeTruthy();
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