import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* Components */
import { PreachingForm } from '../../components';
import { Title } from '../../../ui';

/* Hooks */
import { usePreaching } from '../../hooks';

/* Theme */
import { themeStylesheet } from '../../../theme';

/**
 * This screen is responsible for grouping the components to add or
 * edit a preaching day.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a preaching day
 */
const AddOrEditPreaching = (): JSX.Element => {
    const { state: { seletedPreaching } } = usePreaching();
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: fontSizes.md }}
                    text={ `${ (seletedPreaching.id === '') ? 'Agregar' : 'Editar' } día de predicación` }
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditPreaching;