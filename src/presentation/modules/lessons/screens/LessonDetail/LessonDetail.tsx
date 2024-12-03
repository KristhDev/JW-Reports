import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Screens */
import { FinishOrStartLessonModal } from '../FinishOrStartLessonModal';

/* Components */
import { InfoText, Link, Title } from '@ui';

/* Hooks */
import { useCourses } from '@courses';
import { useLessons } from '../../hooks';

/* Styles */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to
 * show the detail of a lesson.
 *
 * @return {JSX.Element} rendered component to show detail of a lesson
 */
const LessonDetail = (): JSX.Element => {
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { state: { selectedLesson } } = useLessons();

    const statusLessonText = (selectedLesson.done) ? 'Impartida' : 'Por impartir';
    const nextVisit = Time.format(selectedLesson.nextLesson, 'DD [de] MMMM [del] YYYY');

    return (
        <>
            <ScrollView
                contentContainerStyle={ themeStyles.scrollView }
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ `CLASE DEL CURSO CON ${ selectedCourse.personName.toUpperCase() }` }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={ themeStyles.publicationTextContainer }
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={ themeStyles.publicationText }
                />

                {/* Lesson status */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={{ ...themeStyles.detailSubTitle, marginBottom: 0 }}
                        testID="lesson-detail-status-text"
                    >
                        Estado de la clase: { statusLessonText }
                    </Text>

                    <Link
                        onPress={ () => setShowFSModal(true) }
                        testID="lesson-detail-status-text-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        { (!selectedLesson.done) ? '¿Terminar clase?' : '¿Reprogramar?' }
                    </Link>
                </View>

                {/* Lesson description */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="lesson-detail-description-subtitle"
                    >
                        { (selectedLesson.done) ? 'Se analizo:' : 'Se analizará:' }
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="lesson-detail-description-text"
                    >
                        { selectedLesson.description }
                    </Text>
                </View>

                {/* Lesson create date */}
                <View style={ themeStyles.detailSection }>
                    <Text style={ themeStyles.detailSubTitle }>
                        Fecha:
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="lesson-detail-next-visit-text"
                    >
                        { `${ nextVisit }` }
                    </Text>
                </View>

                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="lesson-detail-date-created-text"
                    >
                        { Time.format(selectedLesson.createdAt, 'DD/MM/YYYY') }
                    </Text>
                </View>
            </ScrollView>

            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => setShowFSModal(false) }
            />
        </>
    );
}

export default LessonDetail;