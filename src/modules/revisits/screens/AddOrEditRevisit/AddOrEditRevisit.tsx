import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { RevisitForm } from '../../components';
import { Title } from '../../../ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

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
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
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