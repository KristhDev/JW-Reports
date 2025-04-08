import { useLocalSearchParams } from 'expo-router';

/* Modules */
import { Courses, CoursesProps } from '@courses/screens';

export default function FinishedCoursesScreen({ segment }: { segment: string }): JSX.Element {
    const params = useLocalSearchParams<CoursesProps>();
    return (<Courses { ...params } segment={ segment } />);
}