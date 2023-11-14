import React, { FC } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import dayjs from 'dayjs';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { Button } from '../../../components/ui';

/* Hooks */
import { useAuth, usePreaching, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces';

/* Utils */
import {
    getHoursDoneByWeek,
    getHoursRequirementByWeek,
    getReamainingOfHoursRequirement,
    getRemainingHoursOfWeeklyRequirement
} from '../../../utils';

/* Styles */
import styles from './styles';

/**
 * Generates a preaching information modal component.
 *
 * @param {ModalProps} isOpen - Whether the modal is open or not.
 * @param {() => void} onClose - Function to close the modal.
 * @return {ReactNode} - The preaching information modal component.
 */
const PreachingInfoModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();
    const { width } = useWindowDimensions();

    const firstDayOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
    const lastDayOfWeek = dayjs().endOf('week').format('YYYY-MM-DD');

    const preachingsOfWeek = preachings.filter(
        p => dayjs(p.day).isSame(firstDayOfWeek)
        || dayjs(p.day).isAfter(firstDayOfWeek)
        && dayjs(p.day).isBefore(lastDayOfWeek)
        || dayjs(p.day).isSame(lastDayOfWeek)
    );

    const hoursRequirementByWeek = getHoursRequirementByWeek(user.hoursRequirement);
    const hoursDoneByWeek = getHoursDoneByWeek(preachingsOfWeek);
    const { isNegative: isNegativeHWR, remainingHoursOfWeeklyRequirement } = getRemainingHoursOfWeeklyRequirement(hoursRequirementByWeek, hoursDoneByWeek);
    const { isNegative: isNegativeHR, reamainingOfHoursRequirement } = getReamainingOfHoursRequirement(preachings, user.hoursRequirement);

    return (
        <Modal isOpen={ isOpen }>
            <View
                style={{
                    ...styles.modal,
                    backgroundColor: colors.modal,
                    width: width - 48
                }}
            >
                <Text
                    style={{
                        ...styles.modalTitle,
                        color: colors.text
                    }}
                >
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
                            ? '¡Excelente! Haz cumplido con tu requerimiento de horas por semana.'
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
                            ? '¡Excelente! Haz cumplido con tu requerimiento de horas por mes.'
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
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default PreachingInfoModal;
