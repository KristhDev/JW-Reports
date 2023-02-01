import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RegisterForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

const Register = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
            extraHeight={ 50 }
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title text="Crear cuenta" />

                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Register;