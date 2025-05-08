import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* DI */
import { messagesService } from '@config/di';

/* Components */
import { CourseForm } from '../../components';
import { MicrophoneBtn } from '@shared/components';
import { Title } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useStatus } from '@shared/hooks';
import { useTranslation, useUI } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components
 * to add or edit a course.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a course
 */
const AddOrEditCourse = (): JSX.Element => {
    const appMessages = messagesService.appMessages;
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { setStatus } = useStatus();
    const { translate } = useTranslation();
    const { state: { activeFormField }, setRecordedAudio } = useUI();

    const conditionForNotRecording = (activeFormField.trim().length === 0);
    const handleNotRecording = () => setStatus({ code: 400, msg: appMessages.SELECT_FIELD_TO_RECORD });

    const title = translate('screens.courses.titles.course', {
        action: (selectedCourse.id === '') 
            ? translate('forms.actions.add') 
            : translate('forms.actions.edit')
    }).toUpperCase();

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
                        textStyle={{ fontSize: fontSizes.md }}
                        text={ title }
                    />

                    <CourseForm />
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

export default AddOrEditCourse;