import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { RevisitForm } from '../../components';
import { MicrophoneBtn, useStatus } from '@shared';
import { Title, useUI } from '@ui';

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
    const { setStatus } = useStatus();
    const { state: { activeFormField }, setRecordedAudio } = useUI();

    const conditionForNotRecording = (activeFormField.trim().length === 0);
    const handleNotRecording = () => setStatus({ code: 400, msg: 'Por favor seleccione un campo para grabar el audio.' });

    return (
        <>
            <KeyboardAwareScrollView
                bottomOffset={ margins.xl }
                contentContainerStyle={{ flexGrow: 1 }}
                overScrollMode="never"
            >
                <View style={[ themeStyles.screenContainer, { paddingBottom: margins.xxl } ]}>
                    <Title
                        containerStyle={ themeStyles.titleContainer }
                        text={ `${ (selectedRevisit.id === '') ? 'AGREGAR' : 'EDITAR' } REVISITA` }
                        textStyle={{ fontSize: fontSizes.md }}
                    />

                    <RevisitForm />
                </View>
            </KeyboardAwareScrollView>

            <MicrophoneBtn
                conditionForNotRecording={ conditionForNotRecording }
                onNotRecording={ handleNotRecording }
                onRecord={ setRecordedAudio }
            />
        </>
    );
}

export default AddOrEditRevisit;