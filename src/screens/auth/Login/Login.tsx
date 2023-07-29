import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { LoginForm } from '../../../components/auth';
import { ThemeBtn, Title } from '../../../components/ui';

/**
 * This screen is to display the form to login with
 * an account.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Login = (): JSX.Element => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Title text="Ingresar" />

                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;