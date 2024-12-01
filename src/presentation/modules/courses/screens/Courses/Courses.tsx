import React, { FC, useCallback } from 'react';
import { useStyles } from 'react-native-unistyles';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Features */
import { INIT_COURSE } from '@application/features';

/* Components */
import { CoursesList } from '../../components';
import { Fab } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Interfaces */
import { CoursesProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to show
 * a list of courses according to a filter.
 *
 * @param {CoursesProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of courses
 */
const Courses: FC<CoursesProps> = ({ emptyMessage, filter, segment, title }): JSX.Element => {
    const navigation = useNavigation();
    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    const { setCoursesScreenHistory, setSelectedCourse } = useCourses();

    /**
     * The function handleNavigate is a function that takes no parameters and returns nothing. It sets
     * the selectedCourse to the INIT_COURSE constant and then navigates to the AddOrEditCourseScreen
     * screen.
     *
     * @return {void} This function does not return anything.
     */
    const handleNavigate = (): void => {
        setSelectedCourse(INIT_COURSE);
        router.navigate('/(app)/(tabs)/courses/add-or-edit');
    }

    /**
     * Effect to set coursesScreenHistory when call focus event
     * in screen.
     */
    useFocusEffect(
        useCallback(() => {
            const navigationState = navigation.getState();
            if (!navigationState) return;
            setCoursesScreenHistory(navigationState.routeNames[navigationState.index]);
        }, [])
    );

    return (
        <>
            <CoursesList
                filter={ filter }
                title={ title }
                emptyMessage={ emptyMessage }
            />

            { (segment === 'index') && (
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
            )}
        </>
    );
}

export default Courses;
