import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { ForgotPasswordForm } from '../../components';
import { Title } from '@ui';

/* Styles */
import { themeStylesheet } from '@theme';

/**
 * This screen is to display the form to request a
 * password reset.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const ForgotPassword = (): JSX.Element => {
    const { styles: themeStyles } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title text="Olvide mi contraseña" />

                <ForgotPasswordForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ForgotPassword;