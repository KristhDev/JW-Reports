import React, { FC } from 'react';
import { View, Text, Share } from 'react-native';

import { Modal } from '../../ui';

import { Button } from '../../../components/ui';

import { useAuth, usePreaching, useTheme } from '../../../hooks';

import { sumHours, sumNumbers, getRestMins } from '../../../utils';

import { ReportModalProps } from './interfaces';

import styles from './styles';

const ReportModal: FC<ReportModalProps> = ({ isOpen, month, onClose }) => {
    const { state: { user } } = useAuth();
    const { state: { preachings } } = usePreaching();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const username = `${ user.name } ${ user.surname }`;
    const totalPosts = sumNumbers(preachings.map(p => p.posts));
    const totalVideos = sumNumbers(preachings.map(p => p.videos));
    const totalHours = sumHours(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));
    const totalRevisits = sumNumbers(preachings.map(p => p.revisits));
    const restMins = getRestMins(preachings.map(p => ({ init: p.init_hour, finish: p.final_hour })));

    const handleDeliver = () => {
        onClose();

        let report = '*Informe De Predicación* \n \n';
        report += `Nombre: ${ username }\n`;
        report += `Mes: ${ month.toLowerCase() }\n`;
        report += `Publicaciones: ${ totalPosts }\n`;
        report += `Videos: ${ totalVideos }\n`;
        report += `Horas: ${ totalHours }\n`;
        report += `Revisitas: ${ totalRevisits }\n`;
        report += 'Cursos: 0 \n';
        report += 'Comentarios: Ninguno \n';

        Share.share({
            message: report
        });
    }

    return (
        <Modal isOpen={ isOpen }>
            <View style={{ ...styles.reportModal, backgroundColor: colors.modal }}>
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
                        <Text style={{ ...styles.reportText, color: colors.modalText }}>{ totalPosts }</Text>
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
                        <Text style={{ ...styles.reportText, color: colors.modalText }}>0</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...styles.reportText, color: colors.text }}>Comentarios: </Text>
                        <Text style={{ ...styles.reportText, color: colors.modalText }}>Ninguno</Text>
                    </View>
                </View>

                {
                    (restMins > 0) && (
                        <Text style={{ color: colors.modalText, fontSize: 16, padding: 10 }}>
                            Para este mes te sobraron { restMins } minutos, guardalos para el siguiente mes.
                        </Text>
                    )
                }

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                    <Button
                        onPress={ handleDeliver }
                        text="Entregar"
                        textStyle={{ color: colors.button }}
                        touchableStyle={{ marginRight: 10, backgroundColor: 'transparent' }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />

                    <Button
                        onPress={ onClose }
                        text="Cancelar"
                        textStyle={{ color: colors.button }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default ReportModal;