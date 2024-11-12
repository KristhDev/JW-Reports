import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { useField } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Config */
import { locales } from '@config';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Components */
import { Button } from '../Button';
import { ModalActions } from '../ModalActions';
import { Modal } from '../../screens';

/* Interfaces */
import { FormCalendarProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * Renders a form calendar component.
 *
 * @param {FormCalendarProps} props - The props for the form calendar component.
 * @param {boolean} props.editable - Determines if the calendar is editable.
 * @param {ReactNode} props.icon - The icon for the calendar button.
 * @param {string} props.inputDateFormat - The format of the input date.
 * @param {string} props.label - The label for the form field.
 * @param {StyleProp<TextStyle>} props.labelStyle - The style for the label.
 * @param {Date} props.minDate - The minimum date for the calendar.
 * @param {string} props.name - The name of the form field.
 * @param {(date: string) => void} props.onChangeDate - The callback function when the date changes.
 * @param {StyleProp<ViewStyle>} props.style - The style for the form field container.
 * @return {JSX.Element} The rendered form calendar component.
 */
export const FormCalendar: FC<FormCalendarProps> = ({
    editable = true,
    icon,
    inputDateFormat,
    label,
    labelStyle,
    minDate,
    name,
    onChangeDate,
    style
}): JSX.Element => {
    const [ showCalendarModal, setShowCalendarModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { borderRadius, colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const [ field, meta, helpers ] = useField({ name });
    const [ dateValue, setDateValue ] = useState<string>(field.value);

    /**
     * Handles the cancel action for the form calendar.
     *
     * This function sets the `showCalendarModal` state to `false`,
     * sets the `isFocused` state to `false`, and calls the `setTouched`
     * function from the `helpers` object with the negated value of `meta.touched`.
     *
     * @return {void} This function does not return anything.
     */
    const handleCancel = (): void => {
        setShowCalendarModal(false);
        helpers.setTouched(!meta.touched);
    }

    /**
     * Updates the date value state with the given date value in ISO string format.
     *
     * @param {DateType} dateValue - The date value to update the state with.
     * @return {void} This function does not return anything.
     */
    const handleChange = (dateValue: DateType): void => {
        setDateValue(Time.toISOString(dateValue as Date));
    }

    /**
     * Handles confirming the selected date in the calendar.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
        helpers.setValue(Time.toISOString(dateValue));
        onChangeDate && onChangeDate(Time.toISOString(dateValue));
        setShowCalendarModal(false);
    }

    return (
        <View style={[ themeStyles.formField, style ]}>

            {/* Field label */}
            <Text
                style={[ themeStyles.formLabel, labelStyle ]}
                testID="form-calendar-label"
            >
                { label }
            </Text>

            {/* Field control container */}
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View style={[ { ...themeStyles.formControl, flex: 1 } ]}>

                    {/* Field input */}
                    <TextInput
                        autoCorrect={ false }
                        editable={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[ themeStyles.formInput ]}
                        testID="form-calendar-text-input"
                        value={ Time.format(dateValue, inputDateFormat) }
                    />
                </View>

                {/* Field button */}
                <Button
                    disabled={ !editable }
                    containerStyle={ themeStyles.formInputBtn }
                    icon={ icon }
                    onPress={ () => setShowCalendarModal(true) }
                    pressableStyle={{ marginLeft: margins.sm }}
                />
            </View>

            <Modal isOpen={ showCalendarModal }>
                <View style={ themeStyles.modalContainer }>
                    <DateTimePicker
                        buttonNextIcon={
                            <Ionicons
                                color={ colors.contentHeader }
                                name="chevron-forward"
                                size={ fontSizes.lg }
                                style={{ backgroundColor: colors.button, borderRadius: borderRadius.xs, padding: 2 }}
                            />
                        }
                        buttonPrevIcon={
                            <Ionicons
                                color={ colors.contentHeader }
                                name="chevron-back"
                                size={ fontSizes.lg }
                                style={{ backgroundColor: colors.button, borderRadius: borderRadius.xs, padding: 2 }}
                            />
                        }
                        calendarTextStyle={{ color: colors.text }}
                        date={ dateValue }
                        dayContainerStyle={{ borderRadius: borderRadius.xs }}
                        displayFullDays
                        headerTextStyle={{ color: colors.text, fontSize: (fontSizes.sm + 4) }}
                        locale={ locales.es }
                        minDate={ minDate }
                        mode="single"
                        monthContainerStyle={{ borderColor: colors.button, backgroundColor: 'transparent' }}
                        onChange={ (params) => handleChange(params.date) }
                        selectedItemColor={ colors.button }
                        selectedTextStyle={{ color: colors.contentHeader, fontWeight: 'bold' }}
                        weekDaysTextStyle={{ color: colors.button }}
                        yearContainerStyle={{ borderColor: colors.button, backgroundColor: 'transparent' }}
                    />

                    <ModalActions
                        cancelButtonText="Cancelar"
                        confirmTextButton="Seleccionar"
                        onCancel={ handleCancel }
                        onConfirm={ handleConfirm }
                        showCancelButton
                        showConfirmButton
                    />
                </View>
            </Modal>
        </View>
    );
}