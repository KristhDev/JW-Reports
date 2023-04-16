import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { ProfileForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is to display the form that changes the
 * authenticated user's profile information.
 */
const Profile = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Mi perfil"
                    textStyle={{ fontSize: 24 }}
                />

                <ProfileForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Profile;