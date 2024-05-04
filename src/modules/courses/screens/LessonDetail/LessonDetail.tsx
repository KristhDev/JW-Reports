import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Features */
import { INIT_LESSON } from '../../features';

/* Screens */
import { FinishOrStartLessonModal } from '../FinishOrStartLessonModal';

/* Components */
import { InfoText, Title } from '../../../ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Styles */
import { styles as themeStylesheet } from '../../../theme';
import stylesheet from './styles';

/**
 * This screen is responsible for grouping the components to
 * show the detail of a lesson.
 *
 * @return {JSX.Element} rendered component to show detail of a lesson
 */
const LessonDetail = (): JSX.Element => {
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);
    const { addListener, getState, removeListener } = useNavigation();
    const { name } = useRoute();

    const { state: { selectedCourse, selectedLesson }, setSelectedLesson } = useCourses();
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';
    const nextVisit = dayjs(selectedLesson.nextLesson);

    /**
     * Effect to reset selectedLesson when index in navigation
     * is different from 4.
     */
    useEffect(() => {
        addListener('blur', () => {
            const navigationState = getState();
            if (!navigationState) return;

            if ((name === 'LessonDetailScreen' && navigationState.index !== 4) || (name === 'HomeLessonDetailScreen' && navigationState.index !== 2)) {
                setSelectedLesson({
                    ...INIT_LESSON,
                    nextLesson: new Date().toString()
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
                contentContainerStyle={{ alignItems: 'center', padding: margins.md, paddingBottom: 100, flexGrow: 1 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ `CLASE DEL CURSO CON ${ selectedCourse.personName.toUpperCase() }` }
                    textStyle={{ fontSize: 24 }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={{ padding: 0, paddingBottom: margins.md, width: '100%' }}
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left' }}
                />

                {/* Lesson status */}
                <View
                    style={ styles.sectionStyle }
                    testID="lesson-detail-status-section"
                >
                    <Text style={{ ...styles.sectionSubTitle, marginBottom: 0 }}>
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

                {/* Lesson description */}
                <View
                    style={ styles.sectionStyle }
                    testID="lesson-detail-description-section"
                >
                    <Text style={ styles.sectionSubTitle }>
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

                {/* Lesson create date */}
                <View style={ styles.sectionStyle }>
                    <Text style={ styles.sectionSubTitle }>
                        Fecha:
                    </Text>

                    <Text
                        style={{ color: colors.text, fontSize: 19 }}
                        testID="lesson-detail-next-visit-text"
                    >
                        { `${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }` }
                    </Text>
                </View>

                <Text
                    style={ styles.dateCreatedText }
                    testID="lesson-detail-date-created-text"
                >
                    { dayjs(selectedLesson.createdAt).format('DD/MM/YYYY') }
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