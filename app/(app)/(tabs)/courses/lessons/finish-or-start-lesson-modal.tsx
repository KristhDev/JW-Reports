import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { INIT_LESSON } from '@application/features/lessons';

import { FinishOrStartLessonModal } from '@lessons/screens';

import { useLessons } from '@lessons/hooks';

export default function FinishOrStartLessonModalScreen(): JSX.Element {
    const router = useRouter();

    const { setSelectedLesson } = useLessons();

    const handleHideModal = () => {
        router.dismiss();
        setSelectedLesson(INIT_LESSON);
    }

    return (
        <FinishOrStartLessonModal
            isOpen
            onClose={ handleHideModal }
        />
    );
}