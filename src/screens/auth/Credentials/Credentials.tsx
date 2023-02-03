import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CredentialsForm } from '../../../components/auth';
import { Title } from '../../../components/ui';

import { styles as themeStyles } from '../../../theme';

const Credentials = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
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