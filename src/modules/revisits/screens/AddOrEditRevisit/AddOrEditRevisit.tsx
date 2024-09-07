import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { RevisitForm } from '../../components';
import { Title } from '@ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to add or
 * edit a revisit.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a revisit
 */
const AddOrEditRevisit = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);
    const { state: { selectedRevisit } } = useRevisits();

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ `${ (selectedRevisit.id === '') ? 'Agregar' : 'Editar' } revisita` }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <RevisitForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditRevisit;