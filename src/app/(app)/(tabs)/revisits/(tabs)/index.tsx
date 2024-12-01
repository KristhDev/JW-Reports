import { useLocalSearchParams } from 'expo-router';

/* Modules */
import { Revisits, RevisitsProps } from '@revisits';

export default function RevisitsScreen({ segment }: { segment: string }): JSX.Element {
    const params = useLocalSearchParams<RevisitsProps>();
    return (<Revisits { ...params } segment={ segment } />);
}