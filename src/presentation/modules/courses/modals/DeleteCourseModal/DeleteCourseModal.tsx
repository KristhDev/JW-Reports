import React, { JSX } from 'react';

import { useRouter } from 'expo-router';

import { DeleteModal } from '@ui/screens';

import { useCourses } from '@courses/hooks';
import { useTranslation } from '@ui/hooks';

const DeleteCourseModal = (): JSX.Element => {
    const router = useRouter();

    const { state: { isCourseDeleting }, deleteCourse } = useCourses();
    const { translate } = useTranslation();

    const deleteCourseModalTitle = translate('modals.titles.deleteAsk', {
        article: 'este',
        attribute: translate('forms.fields.course')
    });

    const handleDeleteConfirm = () => {
        deleteCourse({
            onFail: router.dismiss,
            onSuccess: () => router.dismissTo('/(app)/(tabs)/courses')
        });
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

export default DeleteCourseModal;