import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { INIT_COURSE } from '@application/features/courses';

import { ActiveOrSuspendCourseModal } from '@courses/screens';

import { useCourses } from '@courses/hooks';

export default function ActiveOrSuspendCourseModalScreen(): JSX.Element {
    const router = useRouter();

    const { setSelectedCourse } = useCourses();

    const handleHideModal = () => {
        router.dismiss();
        setSelectedCourse(INIT_COURSE);
    }

    return (
        <ActiveOrSuspendCourseModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}