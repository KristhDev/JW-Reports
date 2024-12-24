import React, { Children, FC, useState } from 'react';
import { View, Text, Share, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Constants */
import { MINISTRY_PARTICIPATIONS, precursors } from '@application/constants';

/* Services */
import { PreachingReportService } from '@domain/services';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { ParticipateInMinistry } from '@infrasturcture/interfaces';
import { ReportModalProps } from './interfaces';

/* Screens */
import { Modal, RadioBtn, ModalActions } from '@ui';

/* Hooks */
import { useAuth } from '@auth';
import { usePreaching } from '../../hooks';
import { useCourses } from '@courses';

/* Styles */
import { themeStylesheet } from '@theme';
import { stylesheet } from './styles';

/**
 * This modal is responsible for grouping all the components to display and deliver
 * the report of the month.
 *
 * @param {ReportModalProps} { isOpen: boolean, month: string, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const ReportModal: FC<ReportModalProps> = ({ isOpen, month, onClose }): JSX.Element => {
    const [ comment, setComment ] = useState<string>('');
    const [ hoursLDC, setHoursLDC ] = useState<string>('');
    const [ participated, setParticipated ] = useState<ParticipateInMinistry>('si');

    const [ isFocusedComment, setIsFocusedComment ] = useState<boolean>(false);
    const [ selectionComment, setSelectionComment ] = useState({
        start: comment.length || 0,
        end: comment.length || 0
    });

    const [ isFocusedLDC, setIsFocusedLDC ] = useState<boolean>(false);
    const [ selectionLDC, setSelectionLDC ] = useState({
        start: comment.length || 0,
        end: comment.length || 0
    });

    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { state: { courses } } = useCourses();

    const username = `${ user.name } ${ user.surname }`;
    const totalHours = Time.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
    const totalCourses = courses.filter(c => !c.suspended && !c.finished)?.length;
    const restMins = Time.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

    /**
     * When the user clicks the button, the function will close the modal, create a report string, and
     * then share the report string with the user's preferred sharing method.
     *
     * @return {Promise<void>} This function does not return anything
     */
    const handleDeliverReport = async (): Promise<void> => {
        onClose();

        const report = PreachingReportService.generatePrechingReportString({
            comment,
            courses: totalCourses,
            hours: totalHours,
            hoursLDC: Number(hoursLDC),
            month,
            participated,
            precursor: user.precursor,
            username
        });

        const { action } = await Share.share({ message: report });
        if (action === 'sharedAction') setComment('');
    }

    /**
     * When the user clicks the close button, the comment is cleared and the modal is closed.
     *
     * @return {void} This function does not return anything
     */
    const handleClose = (): void => {
        onClose();
        setComment('');
    }

    return (
        <Modal isOpen={ isOpen }>
            <View style={ styles.reportModal }>
                <Text style={ styles.reportModalInfo }>Estás a punto de entregar tu informe predicación, por favor revisalo.</Text>

                <View style={{ marginTop: margins.xl }}>
                    <Text style={ styles.reportTitle }>Informe De Predicación</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>Nombre: </Text>

                        <Text
                            style={ styles.reportText(colors.modalText) }
                            testID="report-modal-username-text"
                        >
                            { username }
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>Mes: </Text>

                        <Text
                            style={[ styles.reportText(colors.modalText), { textTransform: 'capitalize' } ]}
                            testID="report-modal-month-text"
                        >
                            { month }
                        </Text>
                    </View>

                    { (user.precursor !== precursors.NINGUNO) && (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ styles.reportText(colors.text) }>Horas: </Text>

                            <Text
                                style={ styles.reportText(colors.modalText) }
                                testID="report-modal-hours-text"
                            >
                                { totalHours }
                            </Text>
                        </View>
                    ) }

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>Cursos: </Text>

                        <Text
                            style={ styles.reportText(colors.modalText) }
                            testID="report-modal-courses-text"
                        >
                            { totalCourses }
                        </Text>
                    </View>

                    { (user.precursor === precursors.NINGUNO) && (
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={ styles.reportText(colors.text) }>Participo en el ministerio: </Text>

                            <View style={{ flexDirection: 'row', gap: margins.lg, paddingVertical: margins.xs }}>
                                { Children.toArray(MINISTRY_PARTICIPATIONS.map(particition => (
                                    <RadioBtn
                                        isSelected={ (participated === particition.value) }
                                        label={ particition.label }
                                        onPress={ () => setParticipated(particition.value) }
                                    />
                                ))) }
                            </View>
                        </View>
                    ) }

                    {/* Comment section */}
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ ...styles.reportText(colors.text), marginBottom: margins.sm - 4 }}>
                            Comentarios:
                        </Text>

                        <View style={[ themeStyles.focusExternalBorder(isFocusedComment) ]}>
                            <View style={ themeStyles.defaultBorder(isFocusedComment) }>
                                <View style={[ themeStyles.formControl, themeStyles.focusInternalBorder(isFocusedComment) ]}>
                                    <TextInput
                                        autoCorrect={ false }
                                        cursorColor={ colors.button }
                                        multiline
                                        numberOfLines={ 4 }
                                        onBlur={ () => setIsFocusedComment(false) }
                                        onChangeText={ setComment }
                                        onFocus={ () => setIsFocusedComment(true) }
                                        onSelectionChange={ ({ nativeEvent }) => setSelectionComment(nativeEvent.selection) }
                                        placeholder="Ninguno"
                                        placeholderTextColor={ colors.icon }
                                        selection={ selectionComment }
                                        selectionColor={ colors.linkText }
                                        style={{
                                            ...themeStyles.formInput,
                                            maxHeight: 105,
                                            textAlignVertical: 'top',
                                        }}
                                        testID="report-modal-comment-text-input"
                                        value={ comment }
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    { (user.hoursLDC && user.precursor !== precursors.NINGUNO) && (
                        <View style={{ flexDirection: 'column', marginTop: margins.sm - 4 }}>
                            <Text style={{ ...styles.reportText(colors.text), marginBottom: margins.sm - 4 }}>
                                Horas LDC:
                            </Text>

                            <View style={[ themeStyles.focusExternalBorder(isFocusedLDC) ]}>
                                <View style={ themeStyles.defaultBorder(isFocusedLDC) }>
                                    <View style={[ themeStyles.formControl, themeStyles.focusInternalBorder(isFocusedLDC) ]}>
                                        <TextInput
                                            autoCorrect={ false }
                                            cursorColor={ colors.button }
                                            keyboardType="decimal-pad"
                                            onBlur={ () => setIsFocusedLDC(false) }
                                            onChangeText={ setHoursLDC }
                                            onFocus={ () => setIsFocusedLDC(true) }
                                            onSelectionChange={ ({ nativeEvent }) => setSelectionLDC(nativeEvent.selection) }
                                            placeholder="Ingrese sus horas LDC completas"
                                            placeholderTextColor={ colors.icon }
                                            selection={ selectionLDC }
                                            selectionColor={ colors.linkText }
                                            style={ themeStyles.formInput }
                                            testID="report-modal-hours-ldc-text-input"
                                            value={ hoursLDC }
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) }
                </View>

                { (restMins > 0) && (
                    <Text
                        style={ styles.restMinsText }
                        testID="report-modal-rest-mins-text"
                    >
                        Para este mes te sobraron { restMins } minutos, guardalos para el siguiente mes.
                    </Text>
                ) }

                {/* Modal actions */}
                <ModalActions
                    cancelButtonText="CANCELAR"
                    confirmTextButton="ENTREGAR"
                    onCancel={ handleClose }
                    onConfirm={ handleDeliverReport }
                    showCancelButton
                    showConfirmButton
                />
            </View>
        </Modal>
    );
}

export default ReportModal;