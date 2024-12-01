import React from 'react';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Features */
import { INIT_LESSON } from '@application/features';

/* Components */
import { LessonsList } from '../../components';
import { Fab } from '@ui';

/* Hooks */
import { useLessons } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to show
 * a list of lessons.
 *
 * @return {JSX.Element} rendered component to show list of lessons
 */
const Lessons = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);
    const router = useRouter();

    const { setSelectedLesson } = useLessons();

    /**
     * I want to set the selectedLesson to the INIT_LESSON, but I want to change the next_lesson
     * property to the current date.
     *
     * @return {void} This function does not return anything
     */
    const handleNavigate = (): void => {
        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString(),
        });

        router.navigate('/(app)/(tabs)/courses/add-or-edit-lesson');
    }

    return (
        <>
            <LessonsList />

            <Fab
                color={ colors.button }
                icon={
                    <Ionicons
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ fontSizes.xl }
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
