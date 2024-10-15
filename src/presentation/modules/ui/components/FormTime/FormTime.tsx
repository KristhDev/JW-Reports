import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useField } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Components */
import { Button } from '../Button';
import { ModalActions } from '../ModalActions';
import { Modal } from '../../screens';

/* Interfaces */
import { FormTimeProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';
import { stylesheet } from './styles';

/**
 * Renders a form time component.
 *
 * @param {FormTimeProps} props - The props for the form time component.
 * @param {boolean} props.editable - Determines if the time is editable.
 * @param {ReactNode} props.icon - The icon for the time button.
 * @param {string} props.inputDateFormat - The format of the input date.
 * @param {string} props.label - The label for the form field.
 * @param {StyleProp<TextStyle>} props.labelStyle - The style for the label.
 * @param {string} props.name - The name of the form field.
 * @param {StyleProp<ViewStyle>} props.style - The style for the form field container.
 * @return {JSX.Element} The rendered form time component.
 */
export const FormTime: FC<FormTimeProps> = ({
    editable = true,
    icon,
    inputDateFormat,
    label,
    labelStyle,
    name,
    style
}): JSX.Element => {
    const [ showHourPicker, setShowHourPicker ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const [ field, meta, helpers ] = useField({ name });

    const [ time, setTime ] = useState<string>(field.value);

    const [ hour, setHour ] = useState<string>(Time.format(time, 'HH'));
    const [ minutes, setMinutes ] = useState<string>(Time.format(time, 'mm'));

    /**
     * This function is responsible for showing the hour picker modal and setting the touched state to true.
     * It also sets the hour and minutes of the state to the current hour and minutes of the time state.
     * @returns {void} This function does not return anything
     */
    const handleShowHourPicker = (): void => {
        setShowHourPicker(true);
        helpers.setTouched(true);

        setHour(Time.format(time, 'HH'));
        setMinutes(Time.format(time, 'mm'));
    }

    /**
     * When the user clicks the cancel button, the modal closes and the form field is no longer
     * touched.
     */
    const handleCancel = (): void => {
        setShowHourPicker(false);
        helpers.setTouched(!meta.touched);
    }

    /**
     * Adds the specified number of hours to the current hour in the state. If the resulting hour is greater than 23, it sets the hour to 0. If the resulting hour is less than 0, it sets the hour to 23.
     * @param {number} value - The number of hours to add to the current hour.
     * @returns {void} This function does not return anything
     */
    const addHour = (value: number): void => {
        let hourValue = Number(hour) + value;

        if (hourValue > 23) hourValue = 0;
        if (hourValue < 0) hourValue = 23;

        setHour(hourValue.toString().padStart(2, '0'));
    }

    /**
     * Adds the specified number of minutes to the current minutes in the state. If the resulting minutes is greater than 59, it sets the minutes to 0. If the resulting minutes is less than 0, it sets the minutes to 59.
     * @param {number} value - The number of minutes to add to the current minutes.
     * @returns {void} This function does not return anything
     */
    const addMinutes = (value: number): void => {
        let minutesValue = Number(minutes) + value;

        if (minutesValue > 59) minutesValue = 0;
        if (minutesValue < 0) minutesValue = 59;

        setMinutes(minutesValue.toString().padStart(2, '0'));
    }

    /**
     * Handles confirming the selected hour and minutes in the modal.
     *
     * Sets the time state to the selected hour and minutes, formats the hour and minutes to
     * strings with leading zeros, and sets the touched state of the form field to true.
     *
     * @returns {void} This function does not return anything
     */
    const handleConfirm = (): void => {
        const timeWithHour = Time.setHoursToDate(time, Number(hour));
        const timeWithMinutes = Time.setMinutesToDate(timeWithHour, Number(minutes));
        const timeWithSeconds = Time.setSecondsToDate(timeWithMinutes, 0);

        setTime(timeWithMinutes);
        setHour(Time.format(timeWithSeconds, 'HH'));
        setMinutes(Time.format(timeWithSeconds, 'mm'));

        helpers.setValue(timeWithSeconds);
        setShowHourPicker(false);
    }

    /**
     * Handles setting the hour of the time state.
     *
     * Given a string value, it formats the hour to a string with leading zeros, and sets the hour state to the formatted value.
     * If the hour value is a single digit and greater than 2, it sets the hour to '00'. If the hour value is greater than 23, it sets the hour to '00'.
     * @param {string} value - The hour value to set the time state to.
     * @returns {void} This function does not return anything
     */
    const handleSetHour = (value: string): void => {
        let hourValue = value;

        if (hourValue.length === 1 && hourValue > '2') hourValue = '00';
        if (Number(hourValue) > 23) hourValue = '00';

        setHour(hourValue);
    }

    /**
     * Handles setting the minutes of the time state.
     *
     * Given a string value, it formats the minutes to a string with leading zeros, and sets the minutes state to the formatted value.
     * If the minutes value is a single digit and greater than 5, it sets the minutes to '00'. If the minutes value is greater than 59, it sets the minutes to '00'.
     * @param {string} value - The minutes value to set the time state to.
     * @returns {void} This function does not return anything
     */
    const handleSetMinutes = (value: string): void => {
        let minutesValue = value;

        if (minutesValue.length === 1 && minutesValue > '5') minutesValue = '00';
        if (Number(minutesValue) > 59) minutesValue = '00';

        setMinutes(minutesValue);
    }

    return (
        <View style={[ themeStyles.formField, style ]}>

            {/* Field label */}
            <Text
                style={[ themeStyles.formLabel, labelStyle ]}
                testID="form-time-label"
            >
                { label }
            </Text>

            {/* Field control container */}
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View style={{ ...themeStyles.formControl, flex: 1 }}>

                    {/* Field input */}
                    <TextInput
                        autoCorrect={ false }
                        editable={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[ themeStyles.formInput ]}
                        testID="form-time-text-input"
                        value={ Time.format(field.value, inputDateFormat) }
                    />
                </View>

                {/* Field button */}
                <Button
                    disabled={ !editable }
                    containerStyle={{ minWidth: 0, paddingHorizontal: (margins.xs + 1) }}
                    icon={ icon }
                    onPress={ handleShowHourPicker }
                    pressableStyle={{ marginLeft: margins.sm }}
                />
            </View>

            <Modal isOpen={ showHourPicker }>
                <View style={ themeStyles.modalContainer }>
                    <Text
                        style={[ themeStyles.formLabel, { marginBottom: margins.xl }, labelStyle ]}
                        testID="form-time-label-modal"
                    >
                        { label }
                    </Text>

                    <View style={ styles.timeContainer }>
                        <View style={{ alignItems: 'center', gap: (margins.xs + 4) }}>
                            <Button
                                disabled={ !editable }
                                containerStyle={ styles.modalButtonContainer }
                                icon={
                                    <Ionicons
                                        color={ colors.contentHeader }
                                        name="chevron-up-outline"
                                        size={ (fontSizes.lg - 2) }
                                    />
                                }
                                onPress={ () => addHour(-1) }
                            />

                            <View style={[ themeStyles.formControl, styles.modalInputContainer ]}>
                                <TextInput
                                    autoCorrect={ false }
                                    cursorColor={ colors.button }
                                    editable={ editable }
                                    keyboardType="numeric"
                                    maxLength={ 2 }
                                    onChangeText={ handleSetHour }
                                    placeholderTextColor={ colors.icon }
                                    selectionColor={ colors.linkText }
                                    style={[ themeStyles.formInput, styles.modalInput ]}
                                    testID="form-time-text-input-hour"
                                    value={ hour }
                                />
                            </View>

                            <Button
                                disabled={ !editable }
                                containerStyle={ styles.modalButtonContainer }
                                icon={
                                    <Ionicons
                                        color={ colors.contentHeader }
                                        name="chevron-down-outline"
                                        size={ (fontSizes.lg - 2) }
                                    />
                                }
                                onPress={ () => addHour(+1) }
                            />
                        </View>

                        <Text style={ styles.hourSeparator }>
                            :
                        </Text>

                        <View style={{ alignItems: 'center', gap: (margins.xs + 4) }}>
                            <Button
                                disabled={ !editable }
                                containerStyle={ styles.modalButtonContainer }
                                icon={
                                    <Ionicons
                                        color={ colors.contentHeader }
                                        name="chevron-up-outline"
                                        size={ (fontSizes.lg - 2) }
                                    />
                                }
                                onPress={ () => addMinutes(-1) }
                            />

                            <View style={[ themeStyles.formControl, styles.modalInputContainer ]}>
                                <TextInput
                                    autoCorrect={ false }
                                    editable={ editable }
                                    cursorColor={ colors.button }
                                    placeholderTextColor={ colors.icon }
                                    selectionColor={ colors.linkText }
                                    maxLength={ 2 }
                                    onChangeText={ handleSetMinutes }
                                    keyboardType="numeric"
                                    style={[ themeStyles.formInput, styles.modalInput ]}
                                    testID="form-time-text-input-minutes"
                                    value={ minutes }
                                />
                            </View>

                            <Button
                                disabled={ !editable }
                                containerStyle={ styles.modalButtonContainer }
                                icon={
                                    <Ionicons
                                        color={ colors.contentHeader }
                                        name="chevron-down-outline"
                                        size={ (fontSizes.lg - 2) }
                                    />
                                }
                                onPress={ () => addMinutes(+1) }
                            />
                        </View>
                    </View>

                    <ModalActions
                        confirmTextButton="Aceptar"
                        onConfirm={ handleConfirm }
                        showConfirmButton
                        cancelButtonText="Cancelar"
                        onCancel={ handleCancel }
                        showCancelButton
                    />
                </View>
            </Modal>
        </View>
    );
}