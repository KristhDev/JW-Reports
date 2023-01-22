import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Title } from '../../../components/ui';

import { styles as themeStyles } from '../../../theme';

const ResetPassword = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text="Cambiar contraseña"
                    textStyle={{ fontSize: 24 }}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ResetPassword;