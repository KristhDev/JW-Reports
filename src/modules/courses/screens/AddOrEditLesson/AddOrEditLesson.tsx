import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { LessonForm } from '../../components';
import { Title } from '../../../ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This screen is responsible for grouping the components
 * to add or edit a lesson.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a lesson
 */
const AddOrEditLesson = (): JSX.Element => {
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);
    const { state: { selectedLesson } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: margins.md }}>
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