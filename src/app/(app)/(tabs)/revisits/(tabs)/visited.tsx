import { useLocalSearchParams } from 'expo-router';

/* Modules */
import { Revisits, RevisitsProps } from '@revisits';

export default function VisitedRevisitsScreen({ segment }: { segment: string }): JSX.Element {
    const params = useLocalSearchParams<RevisitsProps>();
    return (<Revisits { ...params } segment={ segment } />);
}