import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ProfileForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

import { styles as themeStyles } from '../../../theme';

const Profile = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Perfil"
                    textStyle={{ fontSize: 24 }}
                />

                <ProfileForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Profile;