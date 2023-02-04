import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Features */
import { INIT_COURSE } from '../../../features/courses';

/* Screens */
import { ActiveOrSuspendCourseModal } from '../ActiveOrSuspendCourseModal';
import { FinishOrStartCourseModal }  from '../FinishOrStartCourseModal';

/* Components */
import { InfoText, Title } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Styles */
import { styles as themeStyles } from '../../../theme';
import styles from './styles';

/**
 * This screen is responsible for grouping the components to
 * show the detail of a course.
 */
const CourseDetail = () => {
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { addListener, getState, navigate, removeListener } = useNavigation();

    const { state: { selectedCourse, selectedLesson }, setSelectedCourse, setSelectedLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const statusCourseText = (selectedCourse.finished)
        ? 'Terminado'
        : (selectedCourse.suspended)
            ? 'Suspendido'
            : 'En curso';

    /**
     * When the user clicks the button, navigate to the AddOrEditLessonScreen screen and pass the
     * selectedLesson object as a prop.
     */
    const handleAddLesson = () => {
        setSelectedLesson({
            ...selectedLesson,
            next_lesson: new Date().toString()
        });

        navigate('AddOrEditLessonScreen' as never);
    }

    /**
     * The function handleLessonsList() is a function that navigates to the LessonsScreen.
     */
    const handleLessonsList = () => {
        navigate('LessonsScreen' as never);
    }

    /**
     * Effect to reset selectedCourse when index of navigation
     * is zero.
     */
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
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedCourse.person_name.toUpperCase() }
                    textStyle={{ fontSize: 24 }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={{ paddingHorizontal: 20, width: '100%' }}
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left' }}
                />

                {/* Course status */}
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

                {/* Text person about */}
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

                {/* Text person address */}
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

                {/* Course last lesson */}
                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Última clase:
                    </Text>

                    {/* Card of last lesson */}
                    { (selectedCourse?.last_lesson) && (
                        <View
                            style={{
                                ...styles.cardContainer,
                                borderColor: colors.text,
                            }}
                        >
                            <View style={{ backgroundColor: colors.header }}>
                                <Text
                                    style={{
                                        ...styles.cardHeaderText,
                                        color: colors.text
                                    }}
                                >
                                    {
                                        (selectedCourse.last_lesson.done)
                                            ? 'Clase impartida'
                                            : `Próxima clase ${ dayjs(selectedCourse.last_lesson.next_lesson).format('DD/MM/YYYY') }`
                                        }
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        ...styles.cardContentText,
                                        color: colors.text,
                                    }}
                                >
                                    { selectedCourse.last_lesson.description }
                                </Text>
                            </View>
                        </View>
                    ) }

                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ handleLessonsList }
                        style={{ marginTop: 20 }}
                    >
                        <Text style={{ color: colors.linkText, fontSize: 19 }}>
                            Ver todas las clases
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ handleAddLesson }
                        style={{ marginTop: 5 }}
                    >
                        <Text style={{ color: colors.linkText, fontSize: 19 }}>
                            Agregar clase
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Date of create course */}
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