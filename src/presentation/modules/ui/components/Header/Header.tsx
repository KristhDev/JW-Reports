import React, { FC, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { BackButton } from '../BackButton';

/* Interfaces */
import { HeaderProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

export const Header: FC<PropsWithChildren<HeaderProps>> = ({ backButtonColor, children, onBackButtonPress, showBackButton, showTitle, style, title, titleStyle }): JSX.Element => {
    const router = useRouter();
    const { styles } = useStyles(stylesheet);

    const handleGoBack = (): void => {
        if (onBackButtonPress) onBackButtonPress();
        else router.back();
    }

    return (
        <View style={[ styles.container, style ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                { (showBackButton) && (
                    <BackButton
                        color={ backButtonColor }
                        onPress={ handleGoBack }
                    />
                ) }

                { (showTitle) && (
                    <Text style={[ styles.headerTitle, titleStyle ]}>
                        { title }
                    </Text>
                ) }
            </View>

            { children }
        </View>
    );
}