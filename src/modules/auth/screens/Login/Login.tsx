import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { LoginForm } from '../../components';
import { ThemeBtn, Title } from '../../../ui';

/**
 * This screen is to display the form to login with
 * an account.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Login = (): JSX.Element => {
    const { theme: { margins } } = useStyles();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ alignItems: 'center', flex: 1, padding: margins.md }}>
                <Title text="Ingresar" />
                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;