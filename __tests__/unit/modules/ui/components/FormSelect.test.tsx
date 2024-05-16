import React from 'react';
import { Formik } from 'formik';
import { render, screen, userEvent } from '@testing-library/react-native';


import { FormSelect, ItemOption } from '../../../../../src/modules/ui';

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

const user = userEvent.setup();

const renderComponent = () => render(
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

describe('Test in <FormSelect /> component', () => {

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective props', async () => {
        renderComponent();

        /* Get label of field */
        const label = await screen.findByTestId('form-select-label');

        /* Check if label exists and contain text pass by props */
        expect(label).toBeTruthy();
        expect(label.props.children).toBe(labelOption);
    });

    it('should change value of select option', async () => {
        renderComponent();

        /* Get touchable */
        const pressable = await screen.findByTestId('form-select-touchable');
        await user.press(pressable);

        /* Get radio touchable */
        const options = await screen.findAllByTestId('radio-btn-pressable');
        await user.press(options[1]);

        /* Get text value of select option */
        const textValue = await screen.findByTestId('form-select-text-value');

        /* Check if text contain option selected */
        expect(textValue.props.children).toBe(itemsOptions[1].label);
    });
});