import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PreachingForm } from '../../../components/preaching';
import { Title } from '../../../components/ui';

import { usePreaching } from '../../../hooks';

import styles from './styles';

const AddOrEditPreaching = () => {
    const { state: { seletedPreaching } } = usePreaching();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ styles.titleContainerStyle }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (seletedPreaching.id === '') ? 'Agregar' : 'Editar' } día de predicación` }
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditPreaching;