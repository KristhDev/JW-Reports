import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { RevisitModal } from '@revisits/modals';

export default function RevisitModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <RevisitModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}