import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { PreachingForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { usePreaching } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components to add or
 * edit a preaching day.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a preaching day
 */
const AddOrEditPreaching = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    const { state: { seletedPreaching } } = usePreaching();
    const { translate } = useTranslation();

    const title = translate('screens.preaching.titles.preachingDay', {
        action: (seletedPreaching.id === '') 
            ? translate('forms.actions.add') 
            : translate('forms.actions.edit')
    }).toUpperCase();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: fontSizes.md }}
                    text={ title }
                />

                <PreachingForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditPreaching;