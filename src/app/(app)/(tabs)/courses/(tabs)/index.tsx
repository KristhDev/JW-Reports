import { useLocalSearchParams } from 'expo-router';

/* Modules */
import { Courses, CoursesProps } from '@courses';

export default function CoursesScreen({ segment }: { segment: string }): JSX.Element {
    const params = useLocalSearchParams<CoursesProps>();
    return (<Courses { ...params } segment={ segment } />);
}