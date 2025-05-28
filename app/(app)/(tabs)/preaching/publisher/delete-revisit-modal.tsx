import { JSX } from 'react';

import { DeleteRevisitModal } from '@revisits/modals';

export default function DeleteRevisitModalScreen(): JSX.Element {
    return (
        <DeleteRevisitModal successDismissPath="/(app)/(tabs)/preaching/publisher" />
    );
}