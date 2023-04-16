import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, Share, TextInput, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { Button } from '../../../components/ui';

/* Hooks */
import { useAuth, useCourses, usePreaching, useTheme } from '../../../hooks';

/* Utils */
import { sumHours, sumNumbers, getRestMins } from '../../../utils';

/* Interfaces */
import { ReportModalProps } from './interfaces';

/* Styles */
import { styles as themeStyles } from '../../../theme';
import styles from './styles';

/**
 * This modal is responsible for grouping all the components to display and deliver
 * the report of the month.
 * @param {ReportModalProps} { isOpen: boolean, month: string, onClose: () => void }
 */
const ReportModal: FC<ReportModalProps> = ({ isOpen, month, onClose }) => {
    const [ comment, setComment ] = useState<string>('');
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
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const username = `${ user.name } ${ user.surname }`;
    const totalPublications = sumNumbers(preachings.map(p => p.publications));
    const totalVideos = sumNumbers(preachings.map(p => p.videos));
    const totalHours = sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));
    const totalRevisits = sumNumbers(preachings.map(p => p.revisits));
    const totalCourses = courses.filter(c => !c.suspended && !c.finished)?.length;
    const restMins = getRestMins(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));

    /**
     * When the user clicks the button, the function will close the modal, create a report string, and
     * then share the report string with the user's preferred sharing method.
     */
    const handleDeliver = async () => {
        onClose();

        let report = '*Informe De Predicación* \n \n';
        report += `Nombre: ${ username }\n`;
        report += `Mes: ${ month.toLowerCase() }\n`;
        report += `Publicaciones: ${ totalPublications }\n`;
        report += `Videos: ${ totalVideos }\n`;
        report += `Horas: ${ totalHours }\n`;
        report += `Revisitas: ${ totalRevisits }\n`;
        report += `Cursos: ${ totalCourses } \n`;
        report += 'Comentarios: \n';
        report += `${ (comment.trim().length > 0) ? comment : 'Ninguno' }`;

        const { action } = await Share.share({
            message: report
        });

        if (action === 'sharedAction') setComment('');
    }

    /**
     * When the user clicks the close button, the comment is cleared and the modal is closed.
     */
    const handleClose = () => {
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
                    <View style={{ ...styles.reportModal, backgroundColor: colors.modal, width: width * 0.87 }}>
                        <Text style={{ ...styles.reportModalInfo, color: colors.modalText }}>Estás a punto de entregar tu informe predicación, por favor revisalo.</Text>

                        <View style={{ padding: 10, marginTop: 20 }}>
                            <Text style={{ ...styles.reportTitle, color: colors.text }}>Informe De Predicación</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Nombre: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ username }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Mes: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ month.toLowerCase() }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Pulicaciones: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalPublications }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Videos: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalVideos }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Horas: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalHours }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Revisitas: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalRevisits }</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.reportText, color: colors.text }}>Cursos: </Text>
                                <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalCourses }</Text>
                            </View>

                            {/* Comment section */}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ ...styles.reportText, color: colors.text, marginBottom: 5 }}>Comentarios: </Text>

                                <View
                                    style={{
                                        ...themeStyles.focusExternalBorder,
                                        borderColor: (isFocused) ? '#FFFFFF' : 'transparent'
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
                                                    color: colors.inputText,
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

                        {
                            (restMins > 0) && (
                                <Text style={{ color: colors.modalText, fontSize: 16, padding: 10 }}>
                                    Para este mes te sobraron { restMins } minutos, guardalos para el siguiente mes.
                                </Text>
                            )
                        }

                        {/* Modal actions */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Button
                                containerStyle={{ paddingHorizontal: 12 }}
                                onPress={ handleClose }
                                text="CANCELAR"
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />

                            <Button
                                containerStyle={{ paddingHorizontal: 12 }}
                                onPress={ handleDeliver }
                                text="ENTREGAR"
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent' }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default ReportModal;