import React, { FC, useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Components */
import { CoursesList } from '../../components';
import { Fab } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';

/* Interfaces */
import { CoursesProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components to show
 * a list of courses according to a filter.
 *
 * @param {CoursesProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of courses
 */
const Courses: FC<CoursesProps> = ({ emptyMessage, filter, renderFab, title }): JSX.Element => {
    const navigation = useNavigation();
    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    const { clearSelectedCourse, setCoursesScreenHistory } = useCourses();

    /**
     * The function handleNavigate is a function that takes no parameters and returns nothing.
     * It calls the clearSelectedCourse function and then navigates to the add-or-edit screen.
     *
     * @return {void} This function does not return anything.
     */
    const handleNavigate = (): void => {
        clearSelectedCourse();
        router.navigate('/(app)/(tabs)/courses/add-or-edit');
    }

    /**
     * Effect to set coursesScreenHistory when call focus event
     * in screen.
     */
    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            const navigationState = navigation.getState();
            if (!navigationState) return;
            setCoursesScreenHistory(navigationState.routeNames[navigationState.index]);
        });

        return focusUnsubscribe;
    }, []);

    return (
        <>
            <CoursesList
                filter={ filter }
                title={ title }
                emptyMessage={ emptyMessage }
            />

            { (!!renderFab) && (
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
