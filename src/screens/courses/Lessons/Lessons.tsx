import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_LESSON } from '../../../features/courses';

/* Components */
import { LessonsList } from '../../../components/courses';
import { Fab } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This screen is responsible for grouping the components to show
 * a list of lessons.
 */
const Lessons = () => {
    const { navigate } = useNavigation();

    const { setSelectedLesson } = useCourses();
    const { state: { colors } } = useTheme();

    /**
     * I want to set the selectedLesson to the INIT_LESSON, but I want to change the next_lesson
     * property to the current date.
     */
    const handleNavigate = () => {
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString(),
        });

        navigate('AddOrEditLessonScreen' as never);
    }

    return (
        <>
            <LessonsList />

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ handleNavigate }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />
        </>
    );
}

export default Lessons;