import React, { JSX } from 'react';

import { useRouter } from 'expo-router';

import { INIT_REVISIT } from '@application/features/revisits';

import { DeleteModal } from '@ui/screens';

import { useRevisits } from '@revisits/hooks';
import { useTranslation } from '@ui/hooks';

export default function DeleteRevisitModal(): JSX.Element {
    const router = useRouter();

    const { state: { isRevisitDeleting }, setSelectedRevisit, deleteRevisit } = useRevisits();
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
        setSelectedRevisit(INIT_REVISIT);
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