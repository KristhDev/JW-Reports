import React, { useState, FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useField } from 'formik';

/* Components */
import { Button } from '../Button';
import { ModalActions } from '../ModalActions';
import { Modal } from '../../screens';

/* Interfaces */
import { FormTimeProps } from './interfaces';

/* Utils */
import { date } from '../../../../utils';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';
import { stylesheet } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const FormTime: FC<FormTimeProps> = ({
    editable,
    icon,
    inputDateFormat,
    label,
    labelStyle,
    name,
    style
}): JSX.Element => {
    const [ showHourPicker, setShowHourPicker ] = useState<boolean>(false);
    const [ time, setTime ] = useState<string>(new Date().toISOString());

    const [ hour, setHour ] = useState<string>(date.format(time, 'HH'));
    const [ minutes, setMinutes ] = useState<string>(date.format(time, 'mm'));

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);
    const [ field, meta, helpers ] = useField({ name });

    const handleShowHourPicker = (): void => {
        setShowHourPicker(true);
        helpers.setTouched(true);

        setHour(date.format(time, 'HH'));
        setMinutes(date.format(time, 'mm'));
    }

    const handleCancel = (): void => {
        setShowHourPicker(false);
        helpers.setTouched(!meta.touched);
    }

    const addHour = (value: number): void => {
        let hourValue = Number(hour) + value;

        if (hourValue > 23) hourValue = 0;
        if (hourValue < 0) hourValue = 23;

        setHour(hourValue.toString().padStart(2, '0'));
    }

    const addMinutes = (value: number): void => {
        let minutesValue = Number(minutes) + value;

        if (minutesValue > 59) minutesValue = 0;
        if (minutesValue < 0) minutesValue = 59;

        setMinutes(minutesValue.toString().padStart(2, '0'));
    }

    const handleConfirm = (): void => {
        const timeWithHour = date.setHoursToDate(time, Number(hour));
        const timeWithMinutes = date.setMinutesToDate(timeWithHour, Number(minutes));

        setTime(timeWithMinutes);
        setHour(date.format(timeWithMinutes, 'HH'));
        setMinutes(date.format(timeWithMinutes, 'mm'));

        helpers.setValue(timeWithMinutes);
        setShowHourPicker(false);
    }

    const handleSetHour = (value: string): void => {
        let hourValue = value;

        if (hourValue.length === 1 && hourValue > '2') hourValue = '00';
        if (Number(hourValue) > 23) hourValue = '00';

        setHour(hourValue);
    }

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
                        testID="form-time-text-input"
                        value={ date.format(field.value, inputDateFormat) }
                    />
                </View>

                {/* Field button */}
                <Button
                    disabled={ !editable }
                    containerStyle={{ minWidth: 0, paddingHorizontal: (margins.xs + 1) }}
                    icon={ icon }
                    onPress={ handleShowHourPicker }
                    text=""
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
                                text=""
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
                                text=""
                            />
                        </View>

                        <Text style={ styles.hourSeparator }>
                            :
                        </Text>

                        <View style={{ alignItems: 'center', gap: margins.xs }}>
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
                                text=""
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
                                text=""
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