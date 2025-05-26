import { useLocalSearchParams } from 'expo-router';

/* Modules */
import { Courses, CoursesProps } from '@courses/screens';

export default function SuspendedCoursesScreen(): JSX.Element {
    const params = useLocalSearchParams<Omit<CoursesProps, 'renderFab'>>();
    return (<Courses { ...params } />);
}