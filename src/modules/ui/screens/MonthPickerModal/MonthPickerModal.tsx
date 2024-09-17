import React, { FC, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, ModalActions } from '../../components';
import { Modal } from '../Modal';

/* Interfaces */
import { MonthPickerModalProps } from './interfaces';

/* Utils */
import { characters, date } from '@utils';

/* Theme */
import { themeStylesheet } from '@theme';
import { stylesheet } from './styles';

/**
 * A modal component for selecting a month and year.
 *
 * @param {boolean} isOpen - Whether the modal is open.
 * @param {string} monthDate - The initial month date.
 * @param {function} onClose - Callback function when the modal is closed.
 * @param {function} onConfirm - Callback function when the month and year are confirmed.
 * @return {JSX.Element} The modal component.
 */
const MonthPickerModal: FC<MonthPickerModalProps> = ({ isOpen, monthDate, onClose, onConfirm }): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const [ monthOfDate, setMonthOfDate ] = useState<{ label: string, value: number }>({
        label: date.getMonthName(date.getMonthOfDate(monthDate)),
        value: date.getMonthOfDate(monthDate)
    });

    const [ monthNumber, setMonthNumber ] = useState<number>(date.getMonthOfDate(monthDate));
    const [ year, setYear ] = useState<number>(date.getYearOfDate(monthDate));

    /**
     * Handles the change in month number by adding the provided value and ensuring it stays within the valid range of 0-11.
     *
     * @param {number} value - The value to add to the current month number.
     * @return {void} Nothing is returned, the month number is updated internally.
     */
    const handleChangeMonthNumber = (value: number): void => {
        const monthValue = monthNumber + value;

        if (monthNumber > 11) setMonthNumber(0);
        if (monthNumber < 0) setMonthNumber(11);

        setMonthNumber(monthValue);
    }

    /**
     * Handles the selection of a month and year, updating the date accordingly and calling the onConfirm callback with the new date.
     *
     * @return {void} Nothing is returned, the onConfirm callback is called internally.
     */
    const handleSelectMonthYear = (): void => {
        const selectedDateWithMonth = date.setMonthToDate(monthDate, monthNumber);
        const selectedDateWithYear = date.setYearToDate(selectedDateWithMonth, year);

        onConfirm(selectedDateWithYear);
    }

    /**
     * Handles the closing of the month picker modal, resetting the month and year to their initial values and calling the onClose callback.
     *
     * @return {void} Nothing is returned, the state is updated internally.
     */
    const handleClose = (): void => {
        setMonthOfDate({
            label: date.getMonthName(date.getMonthOfDate(monthDate)),
            value: date.getMonthOfDate(monthDate)
        });

        setYear(date.getYearOfDate(monthDate));
        setMonthNumber(date.getMonthOfDate(monthDate));

        onClose();
    }

    useEffect(() => {
        setMonthOfDate({
            label: date.getMonthName(monthNumber),
            value: monthNumber
        });
    }, [ monthNumber ]);

    return (
        <Modal isOpen={ isOpen }>
            <View style={ themeStyles.modalContainer }>
                <Text style={ styles.modalTitle }>
                    Seleccione el mes
                </Text>

                <View style={ styles.modalContent }>
                    <View style={{ width: '50%', ...styles.modalInputContainer }}>
                        <Button
                            containerStyle={ styles.modalButtonContainer }
                            icon={
                                <Ionicons
                                    color={ colors.contentHeader }
                                    name="chevron-up-outline"
                                    size={ (fontSizes.lg - 2) }
                                />
                            }
                            onPress={ () => handleChangeMonthNumber(-1) }
                        />

                        <View style={[ themeStyles.formControl, styles.controlInput ]}>
                            <TextInput
                                autoCorrect={ false }
                                cursorColor={ colors.button }
                                editable={ false }
                                placeholderTextColor={ colors.icon }
                                selectionColor={ colors.linkText }
                                style={[ themeStyles.formInput, styles.modalInput ]}
                                testID="form-time-text-input-hour"
                                value={ characters.capitalize(monthOfDate.label) }
                            />
                        </View>

                        <Button
                            containerStyle={ styles.modalButtonContainer }
                            icon={
                                <Ionicons
                                    color={ colors.contentHeader }
                                    name="chevron-down-outline"
                                    size={ (fontSizes.lg - 2) }
                                />
                            }
                            onPress={ () => handleChangeMonthNumber(+1) }
                        />
                    </View>

                    <View style={{ width: '30%', ...styles.modalInputContainer }}>
                        <Button
                            containerStyle={ styles.modalButtonContainer }
                            icon={
                                <Ionicons
                                    color={ colors.contentHeader }
                                    name="chevron-up-outline"
                                    size={ (fontSizes.lg - 2) }
                                />
                            }
                            onPress={ () => setYear(year - 1) }
                        />

                        <View style={[ themeStyles.formControl, styles.controlInput ]}>
                            <TextInput
                                autoCorrect={ false }
                                cursorColor={ colors.button }
                                keyboardType="numeric"
                                maxLength={ 4 }
                                onChangeText={ (text) => setYear(+text) }
                                placeholderTextColor={ colors.icon }
                                selectionColor={ colors.linkText }
                                style={[ themeStyles.formInput, styles.modalInput ]}
                                testID="form-time-text-input-hour"
                                value={ year.toString() }
                            />
                        </View>

                        <Button
                            containerStyle={ styles.modalButtonContainer }
                            icon={
                                <Ionicons
                                    color={ colors.contentHeader }
                                    name="chevron-down-outline"
                                    size={ (fontSizes.lg - 2) }
                                />
                            }
                            onPress={ () => setYear(year + 1) }
                        />
                    </View>
                </View>

                <ModalActions
                    cancelButtonText="Cancelar"
                    confirmTextButton="Seleccionar"
                    onCancel={ handleClose }
                    onConfirm={ handleSelectMonthYear }
                    showCancelButton
                    showConfirmButton
                />
            </View>
        </Modal>
    );
}

export default MonthPickerModal;