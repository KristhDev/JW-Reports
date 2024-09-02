import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { RegisterForm } from '../../components';
import { Title } from '@ui';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is to show the form that will allow users
 * to create a new account.
 *
 * @return {JSX.Element} The rendered form screen of create account
 */
const Register = (): JSX.Element => {
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1, paddingBottom: margins.sm }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title text="Crear cuenta" />

                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Register;