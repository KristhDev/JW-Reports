import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { RegisterForm } from '../../components';
import { Title } from '../../../ui';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is to show the form that will allow users
 * to create a new account.
 *
 * @return {JSX.Element} The rendered form screen of create account
 */
const Register = (): JSX.Element => {
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: margins.md }}
            extraHeight={ 50 }
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title text="Crear cuenta" />

                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Register;