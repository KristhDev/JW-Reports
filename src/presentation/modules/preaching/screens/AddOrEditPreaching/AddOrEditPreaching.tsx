import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { PreachingForm } from '../../components';
import { Title } from '@ui';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to add or
 * edit a preaching day.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a preaching day
 */
const AddOrEditPreaching = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);
    const { state: { seletedPreaching } } = usePreaching();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: fontSizes.md }}
                    text={ `${ (seletedPreaching.id === '') ? 'AGREGAR' : 'EDITAR' } DÍA DE PREDICACIÓN` }
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditPreaching;