import React, { FC } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Screens */
import { Button, Modal } from '../../../ui';

/* Hooks */
import { useAuth } from '../../../auth';
import { usePreaching } from '../../hooks';

/* Interfaces */
import { ModalProps } from '../../../ui';

/* Utils */
import { date } from '../../../../utils';
import { report } from '../../utils';

/* Styles */
import stylesheet from './styles';

/**
 * Generates a preaching information modal component.
 *
 * @param {ModalProps} isOpen - Whether the modal is open or not.
 * @param {() => void} onClose - Function to close the modal.
 * @return {JSX.Element} - The preaching information modal component.
 */
const PreachingInfoModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { styles, theme: { colors } } = useStyles(stylesheet);
    const { width } = useWindowDimensions();

    const preachingsOfWeek = date.getArrayValuesOfWeek(preachings);

    const hoursRequirementByWeek = report.getHoursRequirementByWeek(user.hoursRequirement);
    const hoursDoneByWeek = report.getHoursDoneByWeek(preachingsOfWeek);
    const { isNegative: isNegativeHWR, remainingHoursOfWeeklyRequirement } = report.getRemainingHoursOfWeeklyRequirement(hoursRequirementByWeek, hoursDoneByWeek);
    const { isNegative: isNegativeHR, reamainingOfHoursRequirement } = report.getReamainingOfHoursRequirement(preachings, user.hoursRequirement);

    return (
        <Modal isOpen={ isOpen }>
            <View style={{ ...styles.modal, width: width - 48 }}>
                <Text style={ styles.modalTitle }>
                    Información de Predicación
                </Text>

                <View style={ styles.modalSection }>
                    <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas aproximadas por semana:</Text>
                    <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>{ hoursRequirementByWeek }</Text>
                </View>

                <View style={ styles.modalSection }>
                    <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas completas:</Text>
                    <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>{ hoursDoneByWeek }</Text>
                </View>

                <View style={ styles.modalSection }>
                    <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas faltantes por semana:</Text>
                    <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>
                        { (remainingHoursOfWeeklyRequirement === '0:00' || isNegativeHWR)
                            ? '¡Excelente! has cumplido con tu requerimiento de horas por semana.'
                            : remainingHoursOfWeeklyRequirement
                        }
                    </Text>
                </View>

                { (isNegativeHWR) && (
                    <View style={ styles.modalSection }>
                        <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas extras hechas en está semana:</Text>
                        <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>
                            { remainingHoursOfWeeklyRequirement }
                        </Text>
                    </View>
                ) }

                <View style={ styles.modalSection }>
                    <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas faltantes por mes:</Text>
                    <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>
                        { (reamainingOfHoursRequirement === '0:00' || isNegativeHR)
                            ? '¡Excelente! has cumplido con tu requerimiento de horas por mes.'
                            : reamainingOfHoursRequirement
                        }
                    </Text>
                </View>

                { (isNegativeHR) && (
                    <View style={ styles.modalSection }>
                        <Text style={{ ...styles.modalSectionText, color: colors.text }}>Horas extras hechas en este mes:</Text>
                        <Text style={{ ...styles.modalSectionText, color: colors.modalText }}>
                            { reamainingOfHoursRequirement }
                        </Text>
                    </View>
                ) }

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
                    <Button
                        containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                        onPress={ onClose }
                        text="ESTA BIEN"
                        textStyle={{ color: colors.button, fontSize: 16 }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ colors.buttonTranslucent }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default PreachingInfoModal;
