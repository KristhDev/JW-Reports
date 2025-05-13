import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { LoginForm } from '../../components';
import { ThemeBtn, Title } from '@ui/components';

/* Hooks */
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is to display the form to login with
 * an account.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Login = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);
    const { translate } = useTranslation();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text={ translate('screens.auth.titles.signIn') }
                    textStyle={{ fontSize: fontSizes.lg }}
                />

                <ThemeBtn />

                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;