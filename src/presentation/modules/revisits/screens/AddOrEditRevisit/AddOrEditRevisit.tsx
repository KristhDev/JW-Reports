import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { RevisitForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components to add or
 * edit a revisit.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a revisit
 */
const AddOrEditRevisit = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit } } = useRevisits();
    const { translate } = useTranslation();

    const title = translate('screens.revisits.titles.revisit', {
        action: (selectedRevisit.id === '') 
            ? translate('forms.actions.add') 
            : translate('forms.actions.edit')
    }).toUpperCase();

    return (
        <>
            <KeyboardAwareScrollView
                bottomOffset={ margins.xl }
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={[ themeStyles.screenContainer, { paddingBottom: margins.xxl } ]}>
                    <Title
                        containerStyle={ themeStyles.titleContainer }
                        text={ title }
                        textStyle={{ fontSize: fontSizes.md }}
                    />

                    <RevisitForm />
                </View>
            </KeyboardAwareScrollView>

            {/* <MicrophoneBtn
                conditionForNotRecording={ conditionForNotRecording }
                onNotRecording={ handleNotRecording }
                onRecord={ setRecordedAudio }
            /> */}
        </>
    );
}

export default AddOrEditRevisit;