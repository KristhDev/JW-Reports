import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { INIT_REVISIT } from '@application/features/revisits';

import { PassToCourseModal } from '@courses/screens';

import { useRevisits } from '@revisits/hooks';

export default function PassToCourseModalScreen(): JSX.Element {
    const router = useRouter();

    const { setSelectedRevisit } = useRevisits();

    const handleHideModal = () => {
        router.dismiss();
        setSelectedRevisit(INIT_REVISIT);
    }

    return (
        <PassToCourseModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}