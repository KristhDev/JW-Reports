import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { PreachingForm } from '../../components';
import { Title } from '../../../ui';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is responsible for grouping the components to add or
 * edit a preaching day.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a preaching day
 */
const AddOrEditPreaching = (): JSX.Element => {
    const { state: { seletedPreaching } } = usePreaching();
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (seletedPreaching.id === '') ? 'Agregar' : 'Editar' } día de predicación` }
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditPreaching;