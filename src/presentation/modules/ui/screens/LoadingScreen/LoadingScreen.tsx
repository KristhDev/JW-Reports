import React, { JSX } from 'react';
import { Image, View } from 'react-native';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useStyles } from 'react-native-unistyles';

import { DashLoader } from '@ui/components';

import { useTheme } from '@theme/hooks';

import { stylesheet } from './styles';

const appIcon = require('../../../../../../assets/images/icon.png');

const LoadingScreen = (): JSX.Element => {
    const { styles, theme: { colors } } = useStyles(stylesheet);
    const { state: { theme } } = useTheme();

    const statusBarStyle: StatusBarStyle = (theme === 'dark') ? 'light' : 'dark';

    return (
        <View style={ styles.screen }>
            <StatusBar 
                animated
                backgroundColor={ colors.contentHeader }
                style={ statusBarStyle }
            />

            <Image 
                source={ appIcon }
                style={ styles.logo }
            />

            <DashLoader 
                dashItemWidth={ 32 }
                duration={ 5000 }
                width={ 160 }
            />
        </View>
    );
}

export default LoadingScreen;