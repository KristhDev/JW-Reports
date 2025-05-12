import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { INIT_REVISIT } from '@application/features/revisits';

import { RevisitModal } from '@revisits/screens';

import { useRevisits } from '@revisits/hooks';

export default function RevisitModalScreen(): JSX.Element {
    const router = useRouter();

    const { setSelectedRevisit } = useRevisits();

    const handleHideModal = () => {
        router.dismiss();
        setSelectedRevisit(INIT_REVISIT);
    }

    return (
        <RevisitModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}