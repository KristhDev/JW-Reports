import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RevisitForm } from '../../../components/revisits';
import { Title } from '../../../components/ui';

import { useRevisits } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const AddOrEditRevisit = () => {
    const { state: { seletedRevisit } } = useRevisits();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (seletedRevisit.id === '') ? 'Agregar' : 'Editar' } revisita` }
                />

                <RevisitForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditRevisit;