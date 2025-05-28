import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { ActiveOrSuspendCourseModal } from '@courses/modals';

import { useCourses } from '@courses/hooks';

export default function ActiveOrSuspendCourseModalScreen(): JSX.Element {
    const router = useRouter();

    const { clearSelectedCourse } = useCourses();

    const handleHideModal = () => {
        router.dismiss();
        clearSelectedCourse();
    }

    return (
        <ActiveOrSuspendCourseModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}