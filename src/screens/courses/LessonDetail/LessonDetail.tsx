import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { INIT_LESSON } from '../../../features/courses';

import { FinishOrStartLessonModal } from '../FinishOrStartLessonModal';

import { InfoText, Title } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';
import styles from './styles';

const LessonDetail = () => {
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { addListener, getState, removeListener } = useNavigation();

    const { state: { selectedCourse, selectedLesson }, setSelectedLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';
    const nextVisit = dayjs(selectedLesson.next_lesson);

    useEffect(() => {
        addListener('blur', () => {
            const { index } = getState();
            if (index !== 4) {
                setSelectedLesson({
                    ...INIT_LESSON,
                    next_lesson: new Date().toString()
                });
            }
        });

        return () => {
            removeListener('blur', () => {});
        }
    }, []);

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ `CLASE DEL CURSO CON ${ selectedCourse.person_name.toUpperCase() }` }
                    textStyle={{ fontSize: 24 }}
                />

                <InfoText
                    containerStyle={{ paddingHorizontal: 20, width: '100%' }}
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left' }}
                />

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text,
                            marginBottom: 0
                        }}
                    >
                        Estado de la clase: { statusLessonText }
                    </Text>

                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ () => setShowFSModal(true) }
                    >
                        <Text style={{ color: colors.linkText, fontSize: 19 }}>
                            { (!selectedLesson.done) ? '¿Terminar clase?' : '¿Reprogramar?' }
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        {
                            (selectedLesson.done)
                                ? 'Se analizo:'
                                : 'Se analizará:'
                        }
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedLesson.description }
                    </Text>
                </View>

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Fecha:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { `${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }` }
                    </Text>
                </View>

                <Text style={{ ...styles.dateCreatedText, color: colors.modalText }}>
                    { dayjs(selectedLesson.created_at).format('DD/MM/YYYY') }
                </Text>
            </ScrollView>

            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => setShowFSModal(false) }
            />
        </>
    );
}

export default LessonDetail;