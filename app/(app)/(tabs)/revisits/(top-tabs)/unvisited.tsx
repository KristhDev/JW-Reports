import { useLocalSearchParams } from 'expo-router';

/* Screens */
import { Revisits, RevisitsProps } from '@revisits/screens';

export default function UnvisitedRevisitsScreen(): JSX.Element {
    const params = useLocalSearchParams<Omit<RevisitsProps, 'renderFab'>>();
    return (<Revisits { ...params } />);
}