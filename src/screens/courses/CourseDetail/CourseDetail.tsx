import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Features */
import { INIT_COURSE, INIT_LESSON } from '../../../features/courses';

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
 *
 * @return {JSX.Element} rendered component to show course
 */
const CourseDetail = (): JSX.Element => {
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { addListener, getState, navigate, removeListener } = useNavigation();

    const { state: { selectedCourse }, setSelectedCourse, setSelectedLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const statusCourseText = (selectedCourse.finished)
        ? 'Terminado'
        : (selectedCourse.suspended)
            ? 'Suspendido'
            : 'En curso';

    /**
     * When the user clicks the button, navigate to the AddOrEditLessonScreen screen and pass the
     * selectedLesson object as a prop.
     *
     * @return {void} This function does not return anything.
     */
    const handleAddLesson = (): void => {
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString()
        });

        navigate('AddOrEditLessonScreen' as never);
    }

    /**
     * The function handleLessonsList() is a function that navigates to the LessonsScreen.
     *
     * @return {void} This function does not return anything.
     */
    const handleLessonsList = (): void => {
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
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1, padding: 24, paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedCourse.personName.toUpperCase() }
                    textStyle={{ fontSize: 24 }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={{ padding: 0, paddingBottom: 24, width: '100%' }}
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
                        testID="course-detail-status"
                    >
                        Estado del curso: { statusCourseText }
                    </Text>

                    {
                        (!selectedCourse.finished) ? (
                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowASModal(true) }
                                testID="course-detail-status-touchable"
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    { (selectedCourse.suspended) ? '¿Continuar?' : '¿Suspender?' }
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowFSModal(true) }
                                testID="course-detail-status-touchable"
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    ¿Comenzar de nuevo?
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                {/* Text person about */}
                <View
                    style={ styles.sectionStyle }
                    testID="course-detail-about-section"
                >
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Información de { selectedCourse.personName }:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedCourse.personAbout }
                    </Text>
                </View>

                {/* Text person address */}
                <View
                    style={ styles.sectionStyle }
                    testID="course-detail-address-section"
                >
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Dirección:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedCourse.personAddress }
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
                    { (selectedCourse?.lastLesson) && (
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
                                    testID="course-detail-last-lesson-status"
                                >
                                    {
                                        (selectedCourse.lastLesson.done)
                                            ? 'Clase impartida'
                                            : `Próxima clase ${ dayjs(selectedCourse.lastLesson.next_lesson).format('DD/MM/YYYY') }`
                                        }
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        ...styles.cardContentText,
                                        color: colors.text,
                                    }}
                                    testID="course-detail-last-lesson-description"
                                >
                                    { selectedCourse.lastLesson.description }
                                </Text>
                            </View>
                        </View>
                    ) }

                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ handleLessonsList }
                        style={{ marginTop: 24 }}
                        testID="course-detail-lessons-touchable"
                    >
                        <Text style={{ color: colors.linkText, fontSize: 19 }}>
                            Ver todas las clases
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={ 0.75 }
                        onPress={ handleAddLesson }
                        style={{ marginTop: 8 }}
                        testID="course-detail-add-lesson-touchable"
                    >
                        <Text style={{ color: colors.linkText, fontSize: 19 }}>
                            Agregar clase
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Date of create course */}
                <Text
                    style={{ ...styles.dateCreatedText, color: colors.modalText }}
                    testID="course-detail-text-date"
                >
                    { dayjs(selectedCourse.createdAt).format('DD/MM/YYYY') }
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