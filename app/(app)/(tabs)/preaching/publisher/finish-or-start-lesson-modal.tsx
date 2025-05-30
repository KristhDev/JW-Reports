import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { FinishOrStartLessonModal } from '@lessons/screens';

export default function FinishOrStartLessonModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <FinishOrStartLessonModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}