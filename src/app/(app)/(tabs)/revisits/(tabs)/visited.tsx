import { useLocalSearchParams } from 'expo-router';

/* Screens */
import { Revisits, RevisitsProps } from '@revisits/screens';

export default function VisitedRevisitsScreen({ segment }: { segment: string }): JSX.Element {
    const params = useLocalSearchParams<RevisitsProps>();
    return (<Revisits { ...params } segment={ segment } />);
}