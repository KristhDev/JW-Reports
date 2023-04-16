import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { ForgotPasswordForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

/**
 * This screen is to display the form to request a
 * password reset.
 */
const ForgotPassword = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Title text="Olvide mi contraseña" />

                <ForgotPasswordForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ForgotPassword;