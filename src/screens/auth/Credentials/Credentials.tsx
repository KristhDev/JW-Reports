import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { CredentialsForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is to display the form to change the credentials
 * of the authenticated user.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Credentials = (): JSX.Element => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>
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