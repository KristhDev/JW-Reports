import { JSX } from 'react';
import { useRouter } from 'expo-router';

import { LanguageModal } from '@shared/modals';

export default function LanguageModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = (): void => {
        router.dismiss();
    }

    return (
        <LanguageModal 
            isOpen
            onClose={ handleHideModal }
        />
    );
}