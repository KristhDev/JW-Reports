import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PreachingForm } from '../../../components/preaching';
import { Title } from '../../../components/ui';

import styles from './styles';

const AddPreaching = () => {

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ styles.titleContainerStyle }
                    text="Agregar día de predicación"
                    textStyle={{ fontSize: 24 }}
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddPreaching;