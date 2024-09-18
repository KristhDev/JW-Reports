import React, { Children, FC, useState } from 'react';
import { View, Text, Share, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Screens */
import { Modal, RadioBtn, ModalActions } from '@ui';

/* Hooks */
import { useAuth } from '@auth';
import { usePreaching } from '../../hooks';
import { useCourses } from '@courses';

/* Interfaces */
import { ReportModalProps } from './interfaces';

/* Utils */
import { characters, date } from '@utils';

/* Styles */
import { themeStylesheet } from '@theme';
import { stylesheet } from './styles';

const particitions = [
    { label: 'Si', value: 'si' },
    { label: 'No', value: 'no' }
];

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
    const [ participated, setParticipated ] = useState<string>('si');

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
    const totalHours = date.sumHours(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));
    const totalCourses = courses.filter(c => !c.suspended && !c.finished)?.length;
    const restMins = date.getRestMins(preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

    /**
     * When the user clicks the button, the function will close the modal, create a report string, and
     * then share the report string with the user's preferred sharing method.
     *
     * @return {Promise<void>} This function does not return anything
     */
    const handleDeliver = async (): Promise<void> => {
        onClose();

        let report = '*Informe De Predicación* \n \n';
        report += `Nombre: ${ username }\n`;
        report += `Mes: ${ characters.capitalize(month) }\n`;

        if (user.precursor !== 'ninguno') report += `Horas: ${ totalHours }\n`;
        else report += `Participo en el ministerio: ${ participated }`;

        if (user.precursor !== 'ninguno' && hoursLDC.trim().length > 0) report += `Horas LDC: ${ hoursLDC }\n`;

        report += `Cursos: ${ totalCourses } \n`;
        report += 'Comentarios: \n';
        report += `${ (comment.trim().length > 0) ? comment : 'Ninguno' }`;

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
                        <Text style={ styles.reportText(colors.modalText) }>{ username }</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>Mes: </Text>
                        <Text style={ styles.reportText(colors.modalText) }>{ characters.capitalize(month) }</Text>
                    </View>

                    { (user.precursor !== 'ninguno') && (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ styles.reportText(colors.text) }>Horas: </Text>
                            <Text style={ styles.reportText(colors.modalText) }>{ totalHours }</Text>
                        </View>
                    ) }

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={ styles.reportText(colors.text) }>Cursos: </Text>
                        <Text style={ styles.reportText(colors.modalText) }>{ totalCourses }</Text>
                    </View>

                    { (user.precursor === 'ninguno') && (
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={ styles.reportText(colors.text) }>Participo en el ministerio: </Text>

                            <View style={{ flexDirection: 'row', gap: margins.lg, paddingVertical: margins.xs }}>
                                { Children.toArray(particitions.map(particition => (
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
                                        value={ comment }
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    { (user.hoursLDC && user.precursor !== 'ninguno') && (
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
                                            value={ hoursLDC }
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) }
                </View>

                { (restMins > 0) && (
                    <Text style={ styles.restMinsText }>
                        Para este mes te sobraron { restMins } minutos, guardalos para el siguiente mes.
                    </Text>
                ) }

                {/* Modal actions */}
                <ModalActions
                    cancelButtonText="CANCELAR"
                    confirmTextButton="ENTREGAR"
                    onCancel={ handleClose }
                    onConfirm={ handleDeliver }
                    showCancelButton
                    showConfirmButton
                />
            </View>
        </Modal>
    );
}

export default ReportModal;