import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { LessonForm } from '../../../components/courses';
import { Title } from '../../../components/ui';

/* Hooks */
import { useCourses } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is responsible for grouping the components
 * to add or edit a lesson.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a lesson
 */
const AddOrEditLesson = (): JSX.Element => {
    const { state: { selectedLesson } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ (selectedLesson.id === '') ? 'Agregar clase para el curso' : 'Editar clase del curso' }
                />

                <LessonForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditLesson;