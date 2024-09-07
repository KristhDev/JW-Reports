import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* Components */
import { CourseForm } from '../../components';
import { Title } from '@ui';

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

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: fontSizes.md }}
                    text={ `${ (selectedCourse.id === '') ? 'Agregar' : 'Editar' } curso bíblico` }
                />

                <CourseForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditCourse;