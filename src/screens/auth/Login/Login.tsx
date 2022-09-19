import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LoginForm } from '../../../components/auth';
import { ThemeBtn, Title } from '../../../components/ui';

const Login = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    text="Ingresar"
                />

                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;