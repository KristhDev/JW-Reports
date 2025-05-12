import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { DeleteModal } from '@ui/screens';

import { usePreaching } from '@preaching/hooks';
import { useTranslation } from '@ui/hooks';

export default function DeletePreachingModalScreen(): JSX.Element {
    const router = useRouter();

    const { state: { isPreachingDeleting }, deletePreaching } = usePreaching();
    const { translate } = useTranslation();

    const deletePreachingModalTitle = translate('modals.titles.deleteAsk', { 
        article: 'este',
        attribute: translate('forms.fields.preachingDay'),
    });

    const handleDeleteConfirm = () => {
        deletePreaching({ onFinish: router.dismiss });
    }

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <DeleteModal
            isLoading={ isPreachingDeleting }
            isOpen
            onClose={ handleHideModal }
            onConfirm={ handleDeleteConfirm }
            text={ deletePreachingModalTitle }
        />
    );
}