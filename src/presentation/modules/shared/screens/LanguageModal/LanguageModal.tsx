import React, { FC } from 'react';

/* Constants */
import { LANGUAGE_OPTIONS } from '@application/constants/utils';

/* Screens */
import { OptionsModal } from '@ui/screens';

/* Hooks */
import { useTranslation, useUI } from '@ui/hooks';

/* Interfaces */
import { ModalProps } from '@ui/interfaces';
import { Languages } from '@infrastructure/interfaces';

/**
 * This is a modal that allows the user to change the theme.
 *
 * @param {ModalProps} { isOpen, onClose }
 * @return {JSX.Element} Return jsx element to render modal of theme
 */
const LanguageModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { changeLanguage, translate } = useTranslation();
    const { state: { userInterface } } = useUI();

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={ LANGUAGE_OPTIONS }
            onCancel={ onClose }
            onChangeValue={ (value) => changeLanguage(value as Languages) }
            title={ translate('modals.ui.titles.language') }
            value={ userInterface.language }
        />
    );
}

export default LanguageModal;