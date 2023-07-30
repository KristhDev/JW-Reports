import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import { CourseForm } from '../../../components/courses';
import { Title } from '../../../components/ui';

/* Hooks */
import { useCourses } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is responsible for grouping the components
 * to add or edit a course.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a course
 */
const AddOrEditCourse = (): JSX.Element => {
    const { state: { selectedCourse } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (selectedCourse.id === '') ? 'Agregar' : 'Editar' } curso bíblico` }
                />

                <CourseForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditCourse;