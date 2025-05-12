import React, { JSX } from 'react';

import { useRouter } from 'expo-router';

import { DeleteModal } from '@ui/screens';

import { useCourses } from '@courses/hooks';
import { useTranslation } from '@ui/hooks';

export default function DeleteLessonModal(): JSX.Element {
    const router = useRouter();

    const { state: { isCourseDeleting }, deleteCourse } = useCourses();
    const { translate } = useTranslation();

    const deleteCourseModalTitle = translate('modals.titles.deleteAsk', {
        article: 'este',
        attribute: translate('forms.fields.course')
    });

    const handleDeleteConfirm = () => {
        deleteCourse({ onFinish: router.dismiss });
    }

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <DeleteModal
            isLoading={ isCourseDeleting }
            isOpen
            onClose={ handleHideModal }
            onConfirm={ handleDeleteConfirm }
            text={ deleteCourseModalTitle }
        />
    );
}