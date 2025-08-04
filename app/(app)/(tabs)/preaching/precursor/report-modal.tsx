import React, { JSX } from 'react';
import { useRouter } from 'expo-router';

import { timeAdapter } from '@config/di';

import { ReportModal } from '@preaching/modals';

import { usePreaching } from '@preaching/hooks';

import { Characters } from '@utils';

export default function ReportModalScreen(): JSX.Element {
    const router = useRouter();

    const { state: { selectedDate } } = usePreaching();

    const month = Characters.capitalize(timeAdapter.format(selectedDate, timeAdapter.formats.MONTH_NAME));

    const handleHideModal = () => {
        router.dismiss();
    }

    return (
        <ReportModal
            isOpen
            month={ month }
            onClose={ handleHideModal }
        />
    );
}