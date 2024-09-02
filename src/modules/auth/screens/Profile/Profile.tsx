import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { ProfileForm } from '../../components';
import { Title } from '@ui';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is to display the form that changes the
 * authenticated user's profile information.
 *
 * @return {JSX.Element} The rendered form screen of profile
 */
const Profile = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Mi perfil"
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <ProfileForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Profile;