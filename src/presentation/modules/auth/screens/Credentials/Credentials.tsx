import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { CredentialsForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is to display the form to change the credentials
 * of the authenticated user.
 *
 * @return {JSX.Element} The rendered form screen of credentials
 */
const Credentials = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);
    const { translate } = useTranslation();

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ translate('screens.auth.titles.credentials') }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <CredentialsForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Credentials;