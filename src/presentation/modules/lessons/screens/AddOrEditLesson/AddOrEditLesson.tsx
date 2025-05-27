import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* DI */
import { messagesService } from '@config/di';

/* Components */
import { LessonForm } from '../../components';
import { MicrophoneBtn } from '@shared/components';
import { Title } from '@ui/components';

/* Hooks */
import { useLessons } from '../../hooks';
import { useToaster, useTranslation, useUI } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components
 * to add or edit a lesson.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a lesson
 */
const AddOrEditLesson = (): JSX.Element => {
    const appMessages = messagesService.appMessages;
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedLesson } } = useLessons();
    const { showToast } = useToaster();
    const { translate } = useTranslation();
    const { state: { activeFormField }, setRecordedAudio } = useUI();

    const conditionForNotRecording = (activeFormField.trim().length === 0);
    const handleNotRecording = () => showToast(appMessages.SELECT_FIELD_TO_RECORD);

    const title = (selectedLesson.id === '')
        ? translate('screens.lessons.titles.addLesson')
        : translate('screens.lessons.titles.editLesson');

    return (
        <>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={[ themeStyles.screenContainer, { paddingBottom: margins.xxl } ]}>
                    <Title
                        containerStyle={ themeStyles.titleContainer }
                        textStyle={{ fontSize: fontSizes.md }}
                        text={ title }
                    />

                    <LessonForm />
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

export default AddOrEditLesson;