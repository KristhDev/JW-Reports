import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { FinishOrStartCourseModal } from '@courses/modals';

export default function FinishOrStartCourseModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <FinishOrStartCourseModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}