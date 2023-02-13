import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { FormField } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

jest.mock('../../../src/hooks/useTheme.ts');

const fieldLabel = 'Nombre:';
const fieldPlaceholder = 'Ingrese su nombre';
const textValue = 'Test name';

describe('Test in <FormField /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    const renderComponent = () => {
        render(
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
    }

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', () => {
        renderComponent();

        const label = screen.getByTestId('form-field-label');
        const input = screen.getByTestId('form-field-text-input');
        const icon = screen.getByTestId('form-field-icon');

        expect(label).toBeTruthy();
        expect(label.props.children).toBe(fieldLabel);
        expect(input).toBeTruthy();
        expect(input.props.autoCapitalize).toBe('none');
        expect(input.props.placeholder).toBe(fieldPlaceholder);
        expect(icon).toBeTruthy();
    });

    it('should change value of text input', async () => {
        renderComponent();

        const input = screen.getByTestId('form-field-text-input');

        await act(() => {
            fireEvent(input, 'onChangeText', textValue);
        });

        expect(input.props.value).toBe(textValue);
    });
});