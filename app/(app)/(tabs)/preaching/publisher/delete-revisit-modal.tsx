import React, { JSX } from 'react';

import { useRouter } from 'expo-router';

import { DeleteModal } from '@ui/screens';

import { useRevisits } from '@revisits/hooks';
import { useTranslation } from '@ui/hooks';

export default function DeleteRevisitModal(): JSX.Element {
    const router = useRouter();

    const { state: { isRevisitDeleting }, deleteRevisit } = useRevisits();
    const { translate } = useTranslation();

    const deleteRevisitModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('forms.fields.revisit')
    });

    const handleDeleteConfirm = () => {
        deleteRevisit({ onFinish: router.dismiss });
    }

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <DeleteModal
            isLoading={ isRevisitDeleting }
            isOpen
            onClose={ handleHideModal }
            onConfirm={ handleDeleteConfirm }
            text={ deleteRevisitModalTitle }
        />
    );
}