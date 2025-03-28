import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Config */
import { dependencies, DEPENDENCIES_TYPES } from '@config/inversify';

/* Constants */
import { preachingMessages } from '@application/constants';

/* Contracts */
import { PreachingReportServiceContract } from '@domain/contracts/services';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Adapters */
import { TimeAdapter } from '@infrastructure/adapters';

import { Modal } from '@ui/screens';

/* Components */
import { Button } from '@ui/components';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { usePreaching } from '../../hooks';

import { ModalProps } from '@ui/interfaces';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '@theme/styles';

/**
 * Generates a preaching information modal component.
 *
 * @param {ModalProps} isOpen - Whether the modal is open or not.
 * @param {() => void} onClose - Function to close the modal.
 * @return {JSX.Element} - The preaching information modal component.
 */
const PreachingInfoModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const preachingReportService = useMemo(() => dependencies.get<PreachingReportServiceContract>(DEPENDENCIES_TYPES.PreachingReportService), []);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();

    const preachingsOfWeek = TimeAdapter.getArrayValuesOfWeek<PreachingEntity>(preachings);

    const hoursRequirementByWeek = preachingReportService.getHoursRequirementByWeek(user.hoursRequirement);
    const hoursDoneByWeek = preachingReportService.getHoursDoneByWeek(preachingsOfWeek);

    const { isNegative: isNegativeHWR, remainingHoursOfWeeklyRequirement } = preachingReportService.getRemainingHoursOfWeeklyRequirement(hoursRequirementByWeek, hoursDoneByWeek);
    const { isNegative: isNegativeHR, reamainingOfHoursRequirement } = preachingReportService.getReamainingOfHoursRequirement(preachings, user.hoursRequirement);

    return (
        <Modal isOpen={ isOpen }>
            <View style={ themeStyles.modalContainer }>
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
                            ? preachingMessages.WEEKLY_HOURS_REQUIRED_DONE
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
                            ? preachingMessages.MONTHLY_HOURS_REQUIRED_DONE
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

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: margins.md }}>
                    <Button
                        containerStyle={{ paddingHorizontal: (margins.xs + 4), minWidth: 0 }}
                        onPress={ onClose }
                        pressableStyle={{ backgroundColor: 'transparent' }}
                        text="ESTA BIEN"
                        textStyle={{ color: colors.button, fontSize: fontSizes.sm }}
                        underlayColor={ colors.buttonTranslucent }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default PreachingInfoModal;
