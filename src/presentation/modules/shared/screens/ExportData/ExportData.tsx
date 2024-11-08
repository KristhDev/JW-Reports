import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { Button, Title } from '@ui';

/* Hooks */
import { useExportData } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * Screen to export app data.
 *
 * @returns {JSX.Element} - An jsx element to render the screen.
 */
const ExportDataScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const {
        exportAllData,
        exportCourses,
        exportPreachings,
        exportRevisits,
        isCoursesExporting,
        isDataExporting,
        isPreachingsExporting,
        isRevisitsExporting
    } = useExportData();

    return (
        <View style={ themeStyles.screenContainer }>
            <Title
                text="EXPORTAR INFORMACIÓN"
                textStyle={{ fontSize: fontSizes.md }}
            />

            <Text style={ themeStyles.detailText }>
                Aquí puede exportar su información de la aplicación en pdf, tanto informes de predicación, revisitas y cursos bíblicos.
            </Text>

            <View style={{ gap: margins.md, flex: 1, justifyContent: 'flex-end' }}>
                <Button
                    disabled={ isDataExporting || isCoursesExporting || isPreachingsExporting || isRevisitsExporting }
                    icon={ (isPreachingsExporting && !isDataExporting) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ exportPreachings }
                    text="Exportar info de predicación"
                />

                <Button
                    disabled={ isDataExporting || isCoursesExporting || isPreachingsExporting || isRevisitsExporting }
                    icon={ (isRevisitsExporting && !isDataExporting) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ exportRevisits }
                    text="Exportar revisitas"
                />

                <Button
                    disabled={ isDataExporting || isCoursesExporting || isPreachingsExporting || isRevisitsExporting }
                    icon={ (isCoursesExporting && !isDataExporting) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ exportCourses }
                    text="Exportar cursos bíblicos"
                />

                <Button
                    disabled={ isDataExporting || isCoursesExporting || isPreachingsExporting || isRevisitsExporting }
                    icon={ (isDataExporting) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ exportAllData }
                    text="Exportar todo"
                />
            </View>
        </View>
    );
}

export default ExportDataScreen;