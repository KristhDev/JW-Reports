import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { ForgotPasswordForm } from '../../components';
import { Title } from '../../../ui';

/**
 * This screen is to display the form to request a
 * password reset.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const ForgotPassword = (): JSX.Element => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ alignItems: 'center', flex: 1, padding: 24 }}>
                <Title text="Olvide mi contraseña" />

                <ForgotPasswordForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ForgotPassword;