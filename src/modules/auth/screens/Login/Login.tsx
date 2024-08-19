import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* Components */
import { LoginForm } from '../../components';
import { ThemeBtn, Title } from '../../../ui';

/* Styles */
import { themeStylesheet } from '../../../theme';

/**
 * This screen is to display the form to login with
 * an account.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Login = (): JSX.Element => {
    const { styles: themeStyles } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title text="Ingresar" />
                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;