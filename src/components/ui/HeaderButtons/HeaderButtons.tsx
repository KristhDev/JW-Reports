import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MonthPicker from 'react-native-month-year-picker';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { DeleteModal } from '../../../screens/ui';

/* Components */
import { Fab } from '../Fab';

/* Hooks */
import { useAuth, usePreaching, useTheme } from '../../../hooks';

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
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

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
                {
                    (logoutButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="log-out-outline"
                                    size={ 34 }
                                    style={{ marginLeft: 3 }}
                                />
                            }
                            style={{ marginRight: -2 }}
                            onPress={ signOut }
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

                {
                    (changeMonthButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="calendar-sharp"
                                    size={ 28 }
                                    style={{ marginLeft: 0.5 }}
                                />
                            }
                            onPress={ () => setShowMonthPicker(true) }
                            style={{ marginRight: -2 }}
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

                {
                    (settingsButtons) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="settings-outline"
                                    size={ 28 }
                                    style={{ marginLeft: 1 }}
                                />
                            }
                            onPress={ () => navigate('SettingsStackNavigation' as never) }
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

                {
                    (editButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="pencil-outline"
                                    size={ 26 }
                                    style={{ marginLeft: 2 }}
                                />
                            }
                            onPress={ onPressEditButton }
                            style={{ marginRight: -2 }}
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

                {
                    (deleteButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="trash-outline"
                                    size={ 30 }
                                    style={{ marginLeft: 2 }}
                                />
                            }
                            onPress={ onShowDeleteModal }
                            style={{ marginRight: 6 }}
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

            </View>

            {
                (showMonthPicker) && (
                    <MonthPicker
                        cancelButton="Cancelar"
                        locale="es"
                        mode="short"
                        okButton="Seleccionar"
                        onChange={ (_, date) => handleOnChange(date) }
                        value={ selectedDate }
                    />
                )
            }

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