import { JSX } from 'react';
import { useRouter } from 'expo-router';

import { ThemeModal } from '@theme/modals';

export default function ThemeModalScreen(): JSX.Element {
    const router = useRouter();

    const handleHideModal = (): void => {
        router.dismiss();
    }

    return (
        <ThemeModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}