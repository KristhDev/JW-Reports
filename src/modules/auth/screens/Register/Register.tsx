import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { RegisterForm } from '../../components';
import { Title } from '../../../ui';

/**
 * This screen is to show the form that will allow users
 * to create a new account.
 *
 * @return {JSX.Element} The rendered form screen of create account
 */
const Register = (): JSX.Element => {
    const { theme: { margins } } = useStyles();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
            extraHeight={ 50 }
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
                <Title text="Crear cuenta" />

                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Register;