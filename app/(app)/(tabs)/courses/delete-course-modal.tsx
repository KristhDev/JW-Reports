import React, { JSX } from 'react';

import { useRouter } from 'expo-router';

import { DeleteModal } from '@ui/screens';

import { useLessons } from '@lessons/hooks';
import { useTranslation } from '@ui/hooks';

export default function DeleteCourseModal(): JSX.Element {
    const router = useRouter();

    const { state: { isLessonDeleting }, deleteLesson } = useLessons();
    const { translate } = useTranslation();

    const deleteLessonModalTitle = translate('modals.titles.deleteAsk', {
        article: 'esta',
        attribute: translate('forms.fields.lesson')
    });

    const handleDeleteConfirm = () => {
        deleteLesson({ onFinish: router.dismiss });
    }

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <DeleteModal
            isLoading={ isLessonDeleting }
            isOpen
            onClose={ handleHideModal }
            onConfirm={ handleDeleteConfirm }
            text={ deleteLessonModalTitle }
        />
    );
}