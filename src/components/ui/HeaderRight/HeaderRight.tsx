import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../Fab';

import { useAuth, useTheme } from '../../../hooks';

export const HeaderRight = () => {
    const { logout } = useAuth();
    const { state: { colors, theme } } = useTheme();

    return (
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
                touchColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'  }
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
                touchColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'  }
            />
        </View>
    );
}