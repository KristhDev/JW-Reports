import { JSX } from 'react';

import { DeleteLessonModal } from '@lessons/modals';

export default function DeleteLessonModalScreen(): JSX.Element {
    return (
        <DeleteLessonModal successDismissPath="/(app)/(tabs)/courses/lessons" />
    );
}