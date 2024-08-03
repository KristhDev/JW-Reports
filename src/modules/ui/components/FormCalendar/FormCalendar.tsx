import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { useField } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button } from '../Button';
import { ModalActions } from '../ModalActions';
import { Modal } from '../../screens';

/* Interfaces */
import { FormCalendarProps } from './interfaces';

/* Utils */
import { date, localeEs } from '../../../../utils';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

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
    editable,
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
    const [ field, meta, helpers ] = useField({ name });
    const { styles: themeStyles, theme: { borderRadius, colors, fontSizes, margins } } = useStyles(themeStylesheet);


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
     * Updates the value of the form field with the given date value, hides the calendar modal,
     * and unfocuses the input field.
     *
     * @param {DateType} dateValue - The date value to update the form field with.
     * @return {void} This function does not return anything.
     */
    const handleChange = (dateValue: DateType): void => {
        helpers.setValue(date.toISOString(dateValue as Date));
        onChangeDate && onChangeDate(date.toISOString(dateValue as Date));
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
                <View
                    style={[
                        { ...themeStyles.formControl, flex: 1 },
                        style
                    ]}
                >

                    {/* Field input */}
                    <TextInput
                        autoCorrect={ false }
                        editable={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[ themeStyles.formInput ]}
                        testID="form-calendar-text-input"
                        value={ date.format(field.value, inputDateFormat) }
                    />
                </View>

                {/* Field button */}
                <Button
                    disabled={ !editable }
                    containerStyle={{ minWidth: 0, paddingHorizontal: (margins.xs + 1) }}
                    icon={ icon }
                    onPress={ () => setShowCalendarModal(true) }
                    text=""
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
                        date={ field.value }
                        dayContainerStyle={{ borderRadius: borderRadius.xs }}
                        displayFullDays
                        headerTextStyle={{ color: colors.text, fontSize: (fontSizes.sm + 4) }}
                        locale={ localeEs }
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
                        onCancel={ handleCancel }
                        showCancelButton
                    />
                </View>
            </Modal>
        </View>
    );
}