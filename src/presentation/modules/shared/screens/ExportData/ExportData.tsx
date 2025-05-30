import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button, Title } from '@ui/components';

/* Hooks */
import { useExportData } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

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

    const { translate } = useTranslation();

    const title = translate('screens.ui.titles.exportData');

    return (
        <View style={ themeStyles.screenContainer }>
            <Title
                text={ title }
                textStyle={{ fontSize: fontSizes.md }}
            />

            <Text style={[ themeStyles.detailText, { width: '100%' } ]}>
                { translate('screens.ui.descriptions.exportData') }
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
                    text={ translate('screens.preaching.actions.exportPreaching') }
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
                    text={ translate('screens.revisits.actions.exportRevisits') }
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
                    text={ translate('screens.courses.actions.exportCourses') }
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
                    text={ translate('screens.ui.actions.exportAll') }
                />
            </View>
        </View>
    );
}

export default ExportDataScreen;