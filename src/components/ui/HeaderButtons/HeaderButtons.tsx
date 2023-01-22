import React, { FC, useState } from 'react';
import { View } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { DeleteModal } from '../../../screens/ui';

import { Fab } from '../Fab';

import { useAuth, usePreaching, useTheme } from '../../../hooks';

import { HeaderButtonsProps } from './interfaces';

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
}) => {
    const [ showMonthPicker, setShowMonthPicker ] = useState<boolean>(false);

    const { logout } = useAuth();
    const { setSelectedDate, state: { selectedDate } } = usePreaching();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleOnChange = (date: Date) => {
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
                            onPress={ logout }
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
                            onPress={ () => {} }
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