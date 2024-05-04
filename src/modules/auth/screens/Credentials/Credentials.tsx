import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { CredentialsForm } from '../../components';
import { Title } from '../../../ui';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is to display the form to change the credentials
 * of the authenticated user.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Credentials = (): JSX.Element => {
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Credenciales"
                    textStyle={{ fontSize: 24 }}
                />

                <CredentialsForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Credentials;