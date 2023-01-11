import React, { useState } from 'react';
import { View } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../Fab';

import { useAuth, usePreaching, useTheme } from '../../../hooks';

export const HomeHeader = () => {
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
                <Fab
                    color={ 'transparent' }
                    icon={
                        <Icon
                            color={ colors.button }
                            name="log-in-outline"
                            size={ 34 }
                            style={{ marginRight: 3 }}
                        />
                    }
                    style={{ marginRight: -2 }}
                    onPress={ logout }
                    touchColor={ BUTTON_TRANSPARENT_COLOR }
                />

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
                    style={{ marginRight: 7 }}
                    touchColor={ BUTTON_TRANSPARENT_COLOR }
                />
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

        </>
    );
}