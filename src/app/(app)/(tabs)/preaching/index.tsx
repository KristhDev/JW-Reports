import { Redirect } from 'expo-router';

/* Constants */
import { precursors } from '@application/constants';

/* Auth */
import { useAuth } from '@auth';

/**
 * Redirects to either the Precursor or Publisher tab based on the user's
 * assigned role.
 *
 * @returns A redirect to either the Precursor or Publisher tab.
 */
export default function PreachingRootScreen(): JSX.Element {
    const { state: { user } } = useAuth();

    if (user.precursor !== precursors.NINGUNO) return <Redirect href="/(app)/(tabs)/preaching/precursor" />
    else return <Redirect href="/(app)/(tabs)/preaching/publisher" />
}