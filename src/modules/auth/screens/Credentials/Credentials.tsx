import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { CredentialsForm } from '../../components';
import { Title } from '../../../ui';

/* Theme */
import { themeStylesheet } from '../../../theme';

/**
 * This screen is to display the form to change the credentials
 * of the authenticated user.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Credentials = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Credenciales"
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <CredentialsForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Credentials;