import { useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Components */
import { CoursesList } from '../../components';
import { Fab } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components to show
 * a list of courses according to a filter.
 *
 * @param {CoursesProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of courses
 */
const Courses = (): JSX.Element => {
    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    const { clearSelectedCourse } = useCourses();

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

    return (
        <>
            <CoursesList />

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

export default Courses;
