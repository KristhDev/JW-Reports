import React, { FC, useEffect } from 'react';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_COURSE } from '../../../features/courses';

/* Components */
import { CoursesList } from '../../../components/courses';
import { Fab } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { CoursesTopTabsParamsList } from '../../../interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

type CoursesProps = MaterialTopTabScreenProps<CoursesTopTabsParamsList>;

/**
 * This screen is responsible for grouping the components to show
 * a list of courses according to a filter.
 *
 * @param {CoursesProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of courses
 */
const Courses: FC<CoursesProps> = ({ route }): JSX.Element => {
    const { addListener, removeListener, getState, navigate } = useNavigation();

    const { setCoursesScreenHistory, setSelectedCourse } = useCourses();
    const { state: { colors } } = useTheme();

    /**
     * The function handleNavigate is a function that takes no parameters and returns nothing. It sets
     * the selectedCourse to the INIT_COURSE constant and then navigates to the AddOrEditCourseScreen
     * screen.
     *
     * @return {void} This function does not return anything.
     */
    const handleNavigate = (): void => {
        setSelectedCourse(INIT_COURSE);
        navigate('AddOrEditCourseScreen' as never);
    }

    /**
     * Effect to set coursesScreenHistory when call focus event
     * in screen.
     */
    useEffect(() => {
        addListener('focus', () => {
            const { index, routeNames } = getState();
            setCoursesScreenHistory(routeNames[index]);
        });

        return () => {
            removeListener('focus', () => {});
        }
    }, []);

    return (
        <>
            <CoursesList
                filter={ route.params.filter }
                title={ route.params.title }
                emptyMessage={ route.params.emptyMessage }
            />

            { (route.name === 'CoursesScreen') && (
                <Fab
                    color={ colors.button }
                    icon={
                        <Icon
                            color={ colors.contentHeader }
                            name="add-circle-outline"
                            size={ 40 }
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
