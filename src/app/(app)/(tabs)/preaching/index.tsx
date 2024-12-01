import { useAuth } from '@auth';
import { Redirect } from 'expo-router';

export default function IndexScreen(): JSX.Element {
    const { state: { user } } = useAuth();

    if (user.precursor !== 'ninguno') return <Redirect href="/(app)/(tabs)/preaching/precursor" />
    else return <Redirect href="/(app)/(tabs)/preaching/publisher" />
}