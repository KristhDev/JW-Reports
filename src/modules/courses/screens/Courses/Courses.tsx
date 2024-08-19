import React, { FC, useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_COURSE } from '../../features';

/* Components */
import { CoursesList } from '../../components';
import { Fab } from '../../../ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Interfaces */
import { CoursesTopTabsParamsList } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '../../../theme';

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
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

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
            const navigationState = getState();
            if (!navigationState) return;
            setCoursesScreenHistory(navigationState.routeNames[navigationState.index]);
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
