import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { INIT_COURSE } from '../../../features/courses';

import { ActiveOrSuspendCourseModal } from '../ActiveOrSuspendCourseModal';
import { FinishOrStartCourseModal }  from '../FinishOrStartCourseModal';

import { InfoText, Title } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';
import styles from './styles';

const CourseDetail = () => {
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { addListener, removeListener, getState } = useNavigation();

    const { state: { selectedCourse }, setSelectedCourse } = useCourses();
    const { state: { colors } } = useTheme();

    const statusCourseText = (selectedCourse.finished)
        ? 'Terminado'
        : (selectedCourse.suspended)
            ? 'Suspendido'
            : 'En curso';

    useEffect(() => {
        addListener('blur', () => {
            const { index } = getState();

            if (index === 0) setSelectedCourse(INIT_COURSE);
        });

        return () => {
            removeListener('blur', () => {});
        }
    }, [ selectedCourse ]);

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedCourse.person_name.toUpperCase() }
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
                        Estado del curso: { statusCourseText }
                    </Text>

                    {
                        (!selectedCourse.finished) ? (
                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowASModal(true) }
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    { (selectedCourse.suspended) ? '¿Continuar?' : '¿Suspender?' }
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowFSModal(true) }
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    ¿Comenzar de nuevo?
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Información de { selectedCourse.person_name }:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedCourse.person_about }
                    </Text>
                </View>

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Dirección:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedCourse.person_address }
                    </Text>
                </View>

                <Text style={{ ...styles.dateCreatedText, color: colors.modalText }}>
                    { dayjs(selectedCourse.created_at).format('DD/MM/YYYY') }
                </Text>
            </ScrollView>

            <ActiveOrSuspendCourseModal
                isOpen={ showASModal }
                onClose={ () => setShowASModal(false) }
            />

            <FinishOrStartCourseModal
                isOpen={ showFSModal }
                onClose={ () => setShowFSModal(false) }
            />
        </>
    );
}

export default CourseDetail;