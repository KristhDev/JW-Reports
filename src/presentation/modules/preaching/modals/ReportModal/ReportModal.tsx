import React, { Children, FC, useState } from 'react';
import { View, Text, Share, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* DI */
import { timeAdapter, placeholdersService, preachingReportService, publisherService } from '@config/di';

/* Constants */
import { precursors } from '@application/constants/utils';

/* Interfaces */
import { ParticipateInMinistry } from '@infrastructure/interfaces';
import { ReportModalProps } from './interfaces';

/* Screens */
import { Modal } from '@ui/screens';

/* Components */
import { RadioBtn, ModalActions } from '@ui/components';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { usePreaching } from '../../hooks';
import { useCourses } from '@courses/hooks';
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';
import { stylesheet } from './styles';

/**
 * This modal is responsible for grouping all the components to display and deliver
 * the report of the month.
 *
 * @param {ReportModalProps} { isOpen: boolean, month: string, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const ReportModal: FC<ReportModalProps> = ({ isOpen, month, onClose }): JSX.Element => {
    const MINISTRY_PARTICIPATIONS = publisherService.MINISTRY_PARTICIPATIONS;
    const preachingPlaceholders = placeholdersService.preachingPlaceholders;

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

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { state: { courses } } = useCourses();
    const { translate } = useTranslation();

    const username = `${ user.name } ${ user.surname }`;
    const totalHours = timeAdapter.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
    const totalCourses = courses.filter(c => !c.suspended && !c.finished)?.length;
    const restMins = timeAdapter.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

    /**
     * When the user clicks the button, the function will close the modal, create a report string, and
     * then share the report string with the user's preferred sharing method.
     *
     * @return {Promise<void>} This function does not return anything
     */
    const handleDeliverReport = async (): Promise<void> => {
        onClose();

        const report = preachingReportService.generatePrechingReportString({
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
                <Text style={ styles.reportModalInfo }>
                    { translate('modals.preaching.descriptions.checkReport') }
                </Text>

                <View style={{ marginTop: margins.xl }}>
                    <Text style={ styles.reportTitle }>
                        { translate('modals.preaching.titles.preachingReport') }
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>
                            { translate('forms.labels.name') + ' ' }
                        </Text>

                        <Text
                            style={ styles.reportText(colors.modalText) }
                            testID="report-modal-username-text"
                        >
                            { username }
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>
                            { translate('forms.labels.month') + ' ' }
                        </Text>

                        <Text
                            style={[ styles.reportText(colors.modalText), { textTransform: 'capitalize' } ]}
                            testID="report-modal-month-text"
                        >
                            { month }
                        </Text>
                    </View>

                    { (user.precursor !== precursors.NINGUNO) && (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ styles.reportText(colors.text) }>
                                { translate('forms.labels.hours') + ' ' }
                            </Text>

                            <Text
                                style={ styles.reportText(colors.modalText) }
                                testID="report-modal-hours-text"
                            >
                                { totalHours }
                            </Text>
                        </View>
                    ) }

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>
                            { translate('forms.labels.courses') + ' ' }
                        </Text>

                        <Text
                            style={ styles.reportText(colors.modalText) }
                            testID="report-modal-courses-text"
                        >
                            { totalCourses }
                        </Text>
                    </View>

                    { (user.precursor === precursors.NINGUNO) && (
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={ styles.reportText(colors.text) }>
                                { translate('modals.preaching.subTitles.participeInMinistry') }
                            </Text>

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
                            { translate('forms.labels.comments') }
                        </Text>

                        <View style={[ themeStyles.focusExternalBorder(isFocusedComment) ]}>
                            <View style={ themeStyles.defaultBorder(isFocusedComment) }>
                                <View style={[ themeStyles.formControl, { paddingVertical: margins.xs + 2 }, themeStyles.focusInternalBorder(isFocusedComment) ]}>
                                    <TextInput
                                        autoCorrect={ false }
                                        cursorColor={ colors.button }
                                        multiline
                                        numberOfLines={ 4 }
                                        onBlur={ () => setIsFocusedComment(false) }
                                        onChangeText={ setComment }
                                        onFocus={ () => setIsFocusedComment(true) }
                                        onSelectionChange={ ({ nativeEvent }) => setSelectionComment(nativeEvent.selection) }
                                        placeholder={ translate('forms.placeholders.none') }
                                        placeholderTextColor={ colors.icon }
                                        selection={ selectionComment }
                                        selectionColor={ colors.linkText }
                                        style={{
                                            ...themeStyles.formInput,
                                            minHeight: fontSizes.xxl * 2,
                                            maxHeight: fontSizes.xxl * 3,
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
                                { translate('forms.labels.hoursLDC') }
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
                                            placeholder={ preachingPlaceholders.LDC_HOURS }
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
                        { translate('modals.preaching.descriptions.restMinutes', { restMins }) }
                    </Text>
                ) }

                {/* Modal actions */}
                <ModalActions
                    cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                    confirmTextButton={ translate('forms.actions.preaching.send').toUpperCase() }
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