import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* Modules */
import { CourseForm } from '../../components';
import { MicrophoneBtn, useStatus } from '@shared';
import { Title, useUI } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components
 * to add or edit a course.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a course
 */
const AddOrEditCourse = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();
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
                        textStyle={{ fontSize: fontSizes.md }}
                        text={ `${ (selectedCourse.id === '') ? 'AGREGAR' : 'EDITAR' } CURSO BÍBLICO` }
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