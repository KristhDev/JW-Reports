import React from 'react';
import { Formik } from 'formik';
import { render, screen, fireEvent, act } from '@testing-library/react-native';

import { FormSelect } from '../../../src/components/ui';

import { useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

import { ItemOption } from '../../../src/interfaces/ui';

const itemsOptions: ItemOption[] = [
    { label: 'Test option 1', value: 'test-option-1' },
    { label: 'Test option 2', value: 'test-option-2' },
    { label: 'Test option 3', value: 'test-option-3' },
    { label: 'Test option 4', value: 'test-option-4' }
];

const labelOption = 'Opciones:';
const nameOption = 'option';
const placeholderOption = 'Seleccione una opción';
const titleOption = 'Seleccione una opción';

jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <FormSelect /> component', () => {
    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    const renderComponent = () => {
        render(
            <Formik
                initialValues={{ option: itemsOptions[0].value }}
                onSubmit={ () => {} }
            >
                { () => (
                    <FormSelect
                        items={ itemsOptions }
                        label={ labelOption }
                        name={ nameOption }
                        placeholder={ placeholderOption }
                        title={ titleOption }
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

        const label = screen.getByTestId('form-select-label');

        expect(label).toBeTruthy();
        expect(label.props.children).toBe(labelOption);
    });

    it('should change value of select option', async () => {
        renderComponent();

        const touchable = screen.getByTestId('form-select-touchable');
        fireEvent.press(touchable);

        await act(async () => {
            const options = screen.getAllByTestId('radio-btn-text');
            fireEvent.press(options[1]);
        });

        const textValue = screen.getByTestId('form-select-text-value');

        expect(textValue.props.children).toBe(itemsOptions[1].label);
    });
});