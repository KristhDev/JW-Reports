import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { RegisterForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is to show the form that will allow users
 * to create a new account.
 *
 * @return {JSX.Element} The rendered form screen of create account
 */
const Register = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);
    const { translate } = useTranslation();

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1, paddingBottom: margins.sm }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text={ translate('screens.auth.titles.signUp') }
                    textStyle={{ fontSize: fontSizes.lg }}
                />

                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Register;