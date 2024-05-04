import React, { Children, FC, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, Share, TextInput, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';

/* Screens */
import { Modal, Button, RadioBtn } from '../../../ui';

/* Hooks */
import { useAuth } from '../../../auth';
import { usePreaching } from '../../hooks';
import { useCourses } from '../../../courses';

/* Interfaces */
import { ReportModalProps } from './interfaces';

/* Utils */
import { date } from '../../../../utils';

/* Styles */
import { styles as themeStylesheet } from '../../../theme';
import stylesheet from './styles';

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
    const [ participated, setParticipated ] = useState<string>('si');
    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ selection, setSelection ] = useState({
        start: comment.length || 0,
        end: comment.length || 0
    });

    const { width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { state: { courses } } = useCourses();
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

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
        report += `Mes: ${ month.toLowerCase() }\n`;

        if (user.precursor !== 'ninguno') report += `Horas: ${ totalHours }\n`;
        else report += `Participo en el ministerio: ${ participated }`;

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
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingVertical: top,
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={ false }
                >
                    <View style={{ ...styles.reportModal, width: width - 48 }}>
                        <Text style={ styles.reportModalInfo }>Estás a punto de entregar tu informe predicación, por favor revisalo.</Text>

                        <View style={{ marginTop: margins.lg, marginBottom: margins.md }}>
                            <Text style={ styles.reportTitle }>Informe De Predicación</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Nombre: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ username }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Mes: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ month.toLowerCase() }</Text>
                            </View>

                            { (user.precursor !== 'ninguno') && (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.reportText, color: colors.text }}>Horas: </Text>
                                    <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalHours }</Text>
                                </View>
                            ) }

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Cursos: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalCourses }</Text>
                            </View>

                            { (user.precursor === 'ninguno') && (
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ ...styles.reportText, color: colors.text, marginBottom: 5 }}>Participo en el ministerio: </Text>

                                    <RadioButton.Group
                                        onValueChange={ setParticipated }
                                        value={ participated }
                                    >
                                        <View style={{ flexDirection: 'row', gap: 32, paddingVertical: margins.xs }}>
                                            { Children.toArray(particitions.map(particition => (
                                                <RadioBtn
                                                    label={ particition.label }
                                                    onPress={ () => setParticipated(particition.value) }
                                                    value={ particition.value }
                                                />
                                            ))) }
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            ) }

                            {/* Comment section */}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ ...styles.reportText, color: colors.text, marginBottom: 5 }}>Comentarios: </Text>

                                <View
                                    style={{
                                        ...themeStyles.focusExternalBorder,
                                        borderColor: (isFocused) ? '#FFFFFF' : 'transparent',
                                        marginTop: 16
                                    }}
                                >
                                    <View
                                        style={{
                                            ...themeStyles.defaultBorder,
                                            borderColor: (!isFocused) ? colors.text : colors.focus
                                        }}
                                    >
                                        <View
                                            style={{
                                                ...themeStyles.formControl,
                                                ...themeStyles.focusInternalBorder,
                                                borderColor: (isFocused) ? colors.focus : 'transparent',
                                            }}
                                        >
                                            <TextInput
                                                autoCorrect={ false }
                                                cursorColor={ colors.button }
                                                multiline
                                                numberOfLines={ 4 }
                                                onBlur={ () => setIsFocused(false) }
                                                onChangeText={ setComment }
                                                onFocus={ () => setIsFocused(true) }
                                                onSelectionChange={ ({ nativeEvent }) => setSelection(nativeEvent.selection) }
                                                placeholder="Ninguno"
                                                placeholderTextColor={ colors.icon }
                                                selection={ selection }
                                                selectionColor={ colors.linkText }
                                                style={{
                                                    ...themeStyles.formInput,
                                                    flex: 1,
                                                    maxHeight: 105,
                                                    paddingRight: 5,
                                                    textAlignVertical: 'top',
                                                }}
                                                value={ comment }
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        { (restMins > 0) && (
                            <Text style={{ color: colors.modalText, fontSize: 16, marginBottom: margins.md }}>
                                Para este mes te sobraron { restMins } minutos, guardalos para el siguiente mes.
                            </Text>
                        ) }

                        {/* Modal actions */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button
                                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                                onPress={ handleClose }
                                text="CANCELAR"
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                                underlayColor={ colors.buttonTranslucent }
                            />

                            <Button
                                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                                onPress={ handleDeliver }
                                text="ENTREGAR"
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent' }}
                                underlayColor={ colors.buttonTranslucent }
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default ReportModal;