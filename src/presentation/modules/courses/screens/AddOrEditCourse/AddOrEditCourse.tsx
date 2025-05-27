import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

/* Components */
import { CourseForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components
 * to add or edit a course.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a course
 */
const AddOrEditCourse = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { translate } = useTranslation();

    const title = translate('screens.courses.titles.course', {
        action: (selectedCourse.id === '') 
            ? translate('forms.actions.add') 
            : translate('forms.actions.edit')
    }).toUpperCase();

    return (
        <KeyboardAwareScrollView
            bottomOffset={ margins.xl }
            contentContainerStyle={{ flexGrow: 1 }}
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
    );
}

export default AddOrEditCourse;