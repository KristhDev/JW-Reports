import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useStyles } from 'react-native-unistyles';
/* Screens */
import { Modal } from '../../../ui/screens';

/* Components */
import { Button } from '../../../ui/components';

/* Hooks */
import { useCourses } from '../../hooks';

/* Interfaces */
import { ModalProps } from '../../../ui';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This is a modal that groups the components to activate
 * or suspend a course.
 *
 * @param {ModalProps} { onClose: () => void, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const ActiveOrSuspendCourseModal: FC<ModalProps> = ({ onClose, isOpen }): JSX.Element => {
    const { state: { selectedCourse, isCourseLoading }, activeOrSuspendCourse } = useCourses();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

    const modalMsg = (selectedCourse.suspended)
        ? '¿Está seguro de continuar este curso?'
        : '¿Está seguro de suspender este curso?';

    const confirmTextButton = (selectedCourse.suspended)
        ? 'ACEPTAR'
        : 'SUSPENDER';

    /**
     * HandleConfirm() is a function that calls activeOrSuspendCourse() and passes onClose() as an
     * argument.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
        activeOrSuspendCourse(onClose);
    }

    return (
        <Modal isOpen={ isOpen }>
            { (!isCourseLoading) ? (
                <View style={ themeStyles.modalContainer }>

                    {/* Modal text */}
                    <Text
                        style={{ ...themeStyles.modalText, marginBottom: 0 }}
                        testID="modal-text"
                    >
                        { modalMsg }
                    </Text>

                    {/* Modal actions */}
                    <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>
                        <Button
                            containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                            onPress={ onClose }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent' }}
                            underlayColor={ colors.buttonTranslucent }
                        />

                        <Button
                            containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                            onPress={ handleConfirm }
                            text={ confirmTextButton }
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent' }}
                            underlayColor={ colors.buttonTranslucent }
                        />
                    </View>
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ 50 }
                    testID="modal-loading"
                />
            ) }
        </Modal>
    );
}

export default ActiveOrSuspendCourseModal;