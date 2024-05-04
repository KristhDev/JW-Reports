import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import MonthPicker from 'react-native-month-year-picker';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { DeleteModal } from '../../screens';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useAuth } from '../../../auth';
import { usePreaching } from '../../../preaching';

/* Interfaces */
import { HeaderButtonsProps } from './interfaces';

/**
 * This component is responsible for displaying various buttons that will be in the
 * headers of the screens, they are sent the condition with which they will appear
 * and the action that will be performed.
 *
 * @param {HeaderButtonsProps} props - {
 *      logoutButton: boolean,
 *      changeMonthButton: boolean,
 *      settingsButton: boolean,
 *      editButton: boolean,
 *      onPressEditButton: () => void,
 *      deleteButton: boolean,
 *      deleteModalText: string,
 *      isDeleteModalLoading: boolean,
 *      onCloseDeleteModal: () => void,
 *      onConfirmDeleteModal: () => void,
 *      onShowDeleteModal: () => void,
 *      showDeleteModal: boolean,
 *  }
 * @return {JSX.Element} Return jsx element to render header buttons
 */
export const HeaderButtons: FC<HeaderButtonsProps> = ({
    logoutButton = false,
    changeMonthButton = false,
    settingsButtons = false,

    editButton = false,
    onPressEditButton = () => {},

    deleteButton = false,
    deleteModalText = '',
    isDeleteModalLoading = false,
    onCloseDeleteModal = () => {},
    onConfirmDeleteModal = () => {},
    onShowDeleteModal = () => {},
    showDeleteModal = false,
}): JSX.Element => {
    const [ showMonthPicker, setShowMonthPicker ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { signOut } = useAuth();
    const { setSelectedDate, state: { selectedDate } } = usePreaching();
    const { theme: { colors } } = useStyles();

    /**
     * When the user selects a date, hide the month picker and set the selected date to the date the
     * user selected.
     *
     * @param {Date} date - Date - The date that was selected
     * @return {void} Returns nothing
     */
    const handleOnChange = (date: Date): void => {
        setShowMonthPicker(false);
        if (date) setSelectedDate(date);
    }

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                { (logoutButton) && (
                    <Fab
                        color={ 'transparent' }
                        icon={
                            <Icon
                                color={ colors.button }
                                name="log-out-outline"
                                size={ 34 }
                            />
                        }
                        style={{ marginRight: -2 }}
                        onPress={ signOut }
                        touchColor={ colors.buttonTransparent }
                    />
                ) }

                { (changeMonthButton) && (
                    <Fab
                        color={ 'transparent' }
                        icon={
                            <Icon
                                color={ colors.button }
                                name="calendar-outline"
                                size={ 28 }
                                style={{ marginBottom: 2 }}
                            />
                        }
                        onPress={ () => setShowMonthPicker(true) }
                        style={{ marginRight: -2 }}
                        touchColor={ colors.buttonTransparent }
                    />
                ) }

                { (settingsButtons) && (
                    <Fab
                        color={ 'transparent' }
                        icon={
                            <Icon
                                color={ colors.button }
                                name="settings-outline"
                                size={ 30 }
                            />
                        }
                        onPress={ () => navigate('SettingsStackNavigation' as never) }
                        touchColor={ colors.buttonTransparent }
                    />
                ) }

                { (editButton) && (
                    <Fab
                        color={ 'transparent' }
                        icon={
                            <Icon
                                color={ colors.button }
                                name="pencil-outline"
                                size={ 30 }
                            />
                        }
                        onPress={ onPressEditButton }
                        style={{ marginRight: -2 }}
                        touchColor={ colors.buttonTransparent }
                    />
                ) }

                { (deleteButton) && (
                    <Fab
                        color={ 'transparent' }
                        icon={
                            <Icon
                                color={ colors.button }
                                name="trash-outline"
                                size={ 30 }
                            />
                        }
                        onPress={ onShowDeleteModal }
                        style={{ marginRight: 6 }}
                        touchColor={ colors.buttonTransparent }
                    />
                ) }
            </View>

            { (showMonthPicker) && (
                <MonthPicker
                    cancelButton="Cancelar"
                    locale="es"
                    mode="short"
                    okButton="Seleccionar"
                    onChange={ (_, date) => handleOnChange(date) }
                    value={ selectedDate }
                />
            ) }

            <DeleteModal
                isLoading={ isDeleteModalLoading }
                isOpen={ showDeleteModal }
                onClose={ onCloseDeleteModal }
                onConfirm={ onConfirmDeleteModal }
                text={ deleteModalText }
            />
        </>
    );
}
