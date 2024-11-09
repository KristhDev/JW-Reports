import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useField } from 'formik';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Components */
import { Button } from '../Button';

/* Interfaces */
import { DatetimeFieldProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for displaying a field to select a
 * Date type data, be it a date or time.
 *
 * @param {DatetimeFieldProps} props {
 *      controlStyle: StyleProp<ViewStyle>,
 *      disabled: boolean,
 *      icon: ReactNode,
 *      inputDateFormat: string,
 *      inputStyle: StyleProp<TextStyle>,
 *      label: string,
 *      labelStyle: StyleProp<TextStyle>,
 *      mode: 'date' | 'time' | 'datetime',
 *      name: string,
 *      style: StyleProp<TextStyle>,
 *      ...rest
 *  } - This is a props for functionality of the component
 * - controlStyle: The style of the control field
 * - icon: The icon to be displayed on the right side of the field
 * - inputDateFormat: The format of the input field
 * - inputStyle: The style of the input field
 * - label: The label of the field
 * - labelStyle: The style of the label
 * - mode: The mode of the field
 * - name: The name of the field
 * - style: The style of the field
 * @return {JSX.Element} Returns the component to show the field to select a date
 */
export const DatetimeField: FC<DatetimeFieldProps> = ({
    controlStyle,
    disabled,
    icon,
    inputDateFormat,
    inputStyle,
    label,
    labelStyle,
    mode,
    name,
    style,
    ...rest
}): JSX.Element => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ field, meta, helpers ] = useField({ name });
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);

    /**
     * The function handleConfirm takes a date as an argument and sets the state of open to false and
     * sets the value of the date to the date that was passed in.
     * @param {Date} date - The date that was selected
     */
    const handleConfirm = (date: Date) => {
        setOpen(false);
        helpers.setValue(date);
    }

    /**
     * When the user clicks the cancel button, the modal closes and the form field is no longer
     * touched.
     */
    const handleCancel = () => {
        setOpen(false);
        helpers.setTouched(!meta.touched);
    }

    return (
        <View style={[ themeStyles.formField, style ]}>

            {/* Field label */}
            <Text
                style={[ themeStyles.formLabel, labelStyle ]}
                testID="datetimefield-label"
            >
                { label }
            </Text>

            {/* Field control container */}
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View
                    style={[
                        { ...themeStyles.formControl, flex: 1 },
                        controlStyle
                    ]}
                >

                    {/* Field input */}
                    <TextInput
                        autoCorrect={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[ themeStyles.formInput, inputStyle ]}
                        testID="datetimefield-text-input"
                        value={ Time.format(field.value, inputDateFormat) }
                        { ...rest }
                        editable={ false }
                    />
                </View>

                {/* Field button */}
                <Button
                    disabled={ disabled }
                    containerStyle={ themeStyles.formInputBtn }
                    icon={ icon }
                    onPress={ () => setOpen(true) }
                    pressableStyle={{ marginLeft: margins.sm }}
                />
            </View>

            {/* Modal to pick datetime */}
            <DateTimePickerModal
                accentColor={ colors.button }
                date={ field.value }
                isVisible={ open }
                mode={ mode }
                negativeButton={{ textColor: colors.button, label: 'Cancelar' }}
                onCancel={ handleCancel }
                onConfirm={ handleConfirm }
                positiveButton={{ textColor: colors.button, label: 'Seleccionar' }}
            />
        </View>
    );
}