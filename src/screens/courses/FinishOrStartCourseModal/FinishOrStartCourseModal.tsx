import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { Button } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This modal is responsible for grouping the components to finish
 * or start a course again.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const FinishOrStartCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { selectedCourse, isCourseLoading }, finishOrStartCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const modalMsg = (selectedCourse.finished)
        ? '¿Está seguro de volver a comenzar este curso?'
        : '¿Está seguro de terminar este curso?';

    const confirmTextButton = (selectedCourse.finished) ? 'COMENZAR' : 'TERMINAR';

    /**
     * HandleConfirm() is a function that calls the finishOrStartCourse() function and passes the
     * onClose() function as an argument.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
        finishOrStartCourse(onClose);
    }

    return (
        <Modal isOpen={ isOpen }>
            { (!isCourseLoading) ? (
                <View
                    style={{
                        ...themeStyles.modalContainer,
                        backgroundColor: colors.modal
                    }}
                >
                    <Text
                        style={{
                            ...themeStyles.modalText,
                            color: colors.modalText,
                            marginBottom: 0
                        }}
                        testID="modal-text"
                    >
                        { modalMsg }
                    </Text>

                    <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>
                        <Button
                            containerStyle={{ paddingHorizontal: 12 }}
                            onPress={ onClose }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                            underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                        />

                        <Button
                            containerStyle={{ paddingHorizontal: 12 }}
                            onPress={ handleConfirm }
                            text={ confirmTextButton }
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent' }}
                            underlayColor={ BUTTON_TRANSLUCENT_COLOR }
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

export default FinishOrStartCourseModal;