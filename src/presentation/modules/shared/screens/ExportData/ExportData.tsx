import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useRevisits } from '@revisits';
import { Button, Title } from '@ui';

/* Theme */
import { themeStylesheet } from '@theme';

const ExportDataScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isRevisitsExporting }, exportRevisits } = useRevisits();

    return (
        <View style={ themeStyles.screenContainer }>
            <Title
                text="EXPORTAR INFORMACIÓN"
                textStyle={{ fontSize: fontSizes.md }}
            />

            <Text style={ themeStyles.detailText }>
                Aquí puede exportar su información de la aplicación en pdf, tanto informes de predicación, revisitas y cursos biblícos.
            </Text>

            <View style={{ gap: margins.md, flex: 1, justifyContent: 'flex-end' }}>
                <Button
                    onPress={ () => {} }
                    text="Exportar informes de predicación"
                />

                <Button
                    disabled={ isRevisitsExporting }
                    icon={ (isRevisitsExporting) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ exportRevisits }
                    text="Exportar revisitas"
                />

                <Button
                    onPress={ () => {} }
                    text="Exportar cursos biblícos"
                />

                <Button
                    onPress={ () => {} }
                    text="Exportar todo"
                />
            </View>
        </View>
    );
}

export default ExportDataScreen;