import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { CalendarComponents, Styles } from 'react-native-ui-datepicker/lib/typescript/types';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { timeAdapter } from '@config/di';

/* Components */
import { Button } from '../Button';
import { ModalActions } from '../ModalActions';
import { Modal } from '../../screens';

/* Hooks */
import { useTranslation, useUI } from '@ui/hooks';

/* Interfaces */
import { FormCalendarProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';
import { stylesheet } from './styles';

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
    onChangeDate,
    style,
    value
}): JSX.Element => {
    const [ showCalendarModal, setShowCalendarModal ] = useState<boolean>(false);

    const { styles } = useStyles(stylesheet);
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const [ dateValue, setDateValue ] = useState<string>(value);

    const { translate } = useTranslation();
    const { state: { userInterface } } = useUI();

    const calendarComponents: CalendarComponents = {
        IconNext: (
            <Ionicons
                color={ colors.contentHeader }
                name="chevron-forward"
                size={ fontSizes.lg }
            />
        ),
        IconPrev: (
            <Ionicons
                color={ colors.contentHeader }
                name="chevron-back"
                size={ fontSizes.lg }
            />
        )
    }

    const calendarStyles: Styles = {
        button_next: styles.buttonNext,
        button_prev: styles.buttonPrev,
        day_cell: styles.dayCell,
        day_label: styles.dayLabel,
        month_label: styles.monthLabel,
        month_selector_label: styles.monthSelectorLabel,
        selected_label: styles.selectedLabel,
        selected_month_label: styles.selectedMonthLabel,
        selected_month: styles.selectedMonth,
        selected_year_label: styles.selectedYearLabel,
        selected_year: styles.selectedYear,
        selected: styles.selected,
        today_label: styles.todayLabel,
        today: styles.today,
        weekday_label: styles.weekdayLabel,
        year_label: styles.yearLabel,
        year_selector_label: styles.yearSelectorLabel
    }

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
    }

    /**
     * Updates the date value state with the given date value in ISO string format.
     *
     * @param {DateType} dateValue - The date value to update the state with.
     * @return {void} This function does not return anything.
     */
    const handleChange = (dateValue: DateType): void => {
        setDateValue(timeAdapter.toISOString(dateValue as Date));
    }

    /**
     * Handles confirming the selected date in the calendar.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
        onChangeDate && onChangeDate(timeAdapter.toISOString(dateValue));
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
                        value={ timeAdapter.format(dateValue, inputDateFormat) }
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
                        components={ calendarComponents }
                        date={ dateValue }
                        locale={ userInterface.language || 'en' }
                        minDate={ minDate }
                        mode="single"
                        onChange={ (params) => handleChange(params.date) }
                        showOutsideDays
                        styles={ calendarStyles }
                        weekdaysFormat="short"
                    />

                    <ModalActions
                        cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                        confirmTextButton={ translate('forms.actions.select').toUpperCase() }
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