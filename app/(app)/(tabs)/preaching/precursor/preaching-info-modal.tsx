import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { PreachingInfoModal } from '@preaching/modals';

export default function PreachingInfoModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <PreachingInfoModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}