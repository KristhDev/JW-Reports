import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { PassToCourseModal } from '@courses/screens';

import { useRevisits } from '@revisits/hooks';

export default function PassToCourseModalScreen(): JSX.Element {
    const router = useRouter();

    const { clearSelectedRevisit } = useRevisits();

    const handleHideModal = () => {
        router.dismiss();
        clearSelectedRevisit();
    }

    return (
        <PassToCourseModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}