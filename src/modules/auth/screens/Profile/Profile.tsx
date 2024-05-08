import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { ProfileForm } from '../../components';
import { Title } from '../../../ui';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is to display the form that changes the
 * authenticated user's profile information.
 *
 * @return {JSX.Element} The rendered form screen of profile
 */
const Profile = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
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