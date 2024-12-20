import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { LoginForm } from '../../components';
import { ThemeBtn, Title } from '@ui';

/* Styles */
import { themeStylesheet } from '@theme';

/**
 * This screen is to display the form to login with
 * an account.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Login = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text="INGRESAR"
                    textStyle={{ fontSize: fontSizes.lg }}
                />

                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;